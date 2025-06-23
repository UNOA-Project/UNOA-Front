import { useState, useEffect, useRef, useCallback } from 'react'

// 서버와 주고받는 모든 소켓 이벤트 이름을 한 곳에서 관리
const SOCKET_EVENTS = {
  CONVERSATION_HISTORY: 'conversation-history',
  STREAM_START: 'stream-start',
  STREAM_CHUNK: 'stream-chunk',
  STREAM_END: 'stream-end',
  ERROR: 'error',
  USER_MESSAGE: 'user-message',
  RESET_CONVERSATION: 'reset-conversation',
}

/**
 * 챗봇의 모든 대화 관련 로직을 관리하는 커스텀 훅
 * @param {object} socket - useSocket 훅에서 생성된 소켓 객체
 * @param {boolean} isConnected - 현재 소켓 연결 상태
 * @returns {object} 메시지 목록, 스트리밍 상태, 메시지 전송/초기화 함수 등
 */
export const useChat = (socket, isConnected) => {
  // --- 상태 관리 ---
  const [messages, setMessages] = useState([]) // 채팅 화면에 표시될 메시지 배열
  const [isStreaming, setIsStreaming] = useState(false) // AI가 답변을 생성 중인지 여부
  const streamingMessageIdRef = useRef(null) // 스트리밍 중인 AI 메시지의 임시 ID를 추적

  // --- 소켓 이벤트 리스너 설정 ---
  useEffect(() => {
    if (!socket) return

    // [이벤트 핸들러] AI 응답 스트림 시작
    const handleStreamStart = (data = {}) => {
      setIsStreaming(true)
      const messageId = data.messageId || `assistant-temp-${Date.now()}`
      streamingMessageIdRef.current = messageId
      const streamingPlaceholder = {
        id: messageId,
        role: 'assistant',
        content: '',
        timestamp: data.timestamp || new Date().toISOString(),
        isStreaming: true,
      }
      setMessages(prev => [...prev, streamingPlaceholder])
    }

    // [이벤트 핸들러] AI 응답 스트림 데이터 수신
    const handleStreamChunk = chunk => {
      if (chunk && streamingMessageIdRef.current) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === streamingMessageIdRef.current
              ? { ...msg, content: msg.content + chunk }
              : msg
          )
        )
      }
    }

    // [이벤트 핸들러] AI 응답 스트림 종료 및 카드 메시지 처리
    const handleStreamEnd = (data = {}) => {
      // 1. 텍스트 메시지 업데이트
      if (data.message && streamingMessageIdRef.current) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === streamingMessageIdRef.current
              ? { ...data.message, id: msg.id, isStreaming: false }
              : msg
          )
        )
      }

      // 2. 추천 요금제 카드 메시지 추가
      if (data.recommendedPlans && data.recommendedPlans.length > 0) {
        const cardMessage = {
          id: `card-${Date.now()}`,
          role: 'card',
          content: data.recommendedPlans,
          timestamp: new Date().toISOString(),
        }
        setMessages(prev => [...prev, cardMessage])
      }

      setIsStreaming(false)
      streamingMessageIdRef.current = null
    }

    // [이벤트 핸들러] 서버로부터 에러 수신
    const handleError = error => {
      console.error('소켓 에러 수신:', error.message)
      setIsStreaming(false)
      addLocalMessage(`오류가 발생했습니다: ${error.message}`, 'system')
    }

    // [이벤트 핸들러] 이전 대화 기록 수신
    const handleConversationHistory = history => {
      console.log(`${history.length}개의 이전 대화 기록을 받았습니다.`)

      const processedMessages = []
      history.forEach(message => {
        processedMessages.push(message)

        if (
          message.role === 'assistant' &&
          message.recommendedPlans &&
          message.recommendedPlans.length > 0
        ) {
          const cardMessage = {
            id: `card-${message._id || Date.now()}`, // DB의 _id를 사용
            role: 'card',
            content: message.recommendedPlans,
            timestamp: message.timestamp, // 원래 메시지와 동일한 시간
          }
          processedMessages.push(cardMessage)
        }
      })

      setMessages(processedMessages)
    }

    // 소켓 이벤트 리스너 등록
    socket.on(SOCKET_EVENTS.CONVERSATION_HISTORY, handleConversationHistory)
    socket.on(SOCKET_EVENTS.STREAM_START, handleStreamStart)
    socket.on(SOCKET_EVENTS.STREAM_CHUNK, handleStreamChunk)
    socket.on(SOCKET_EVENTS.STREAM_END, handleStreamEnd)
    socket.on(SOCKET_EVENTS.ERROR, handleError)

    // 컴포넌트가 사라질 때 이벤트 리스너를 깨끗하게 정리
    return () => {
      socket.off(SOCKET_EVENTS.CONVERSATION_HISTORY, handleConversationHistory)
      socket.off(SOCKET_EVENTS.STREAM_START, handleStreamStart)
      socket.off(SOCKET_EVENTS.STREAM_CHUNK, handleStreamChunk)
      socket.off(SOCKET_EVENTS.STREAM_END, handleStreamEnd)
      socket.off(SOCKET_EVENTS.ERROR, handleError)
    }
  }, [socket]) 

  // --- 외부에서 사용할 함수들 ---

  // 서버 통신 없이 UI에 시스템 메시지 등을 직접 추가하는 함수
  const addLocalMessage = useCallback((content, role = 'system') => {
    const localMessage = {
      id: `local-${role}-${Date.now()}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, localMessage])
  }, [])

  // 서버로 사용자 메시지를 전송하는 메인 함수
  const sendMessage = useCallback(
    (text, mode = 'normal') => {
      if (!text.trim() || isStreaming || !socket || !isConnected) return

      // 즉각적인 UI 반응을 위한 '낙관적 업데이트'
      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, userMessage])

      const payload = { text: text.trim(), mode, history: messages }
      socket.emit(SOCKET_EVENTS.USER_MESSAGE, payload)
    },
    [socket, isConnected, isStreaming, messages]
  )

  // 화면에 표시하지 않고, 서버로 프롬프트를 전송하는 함수
  const sendPromptSilently = useCallback(
    (promptText, mode = 'normal') => {
      if (!promptText.trim() || isStreaming || !socket || !isConnected) return

      const payload = {
        text: promptText.trim(),
        mode: mode,
        history: messages, // 문맥 유지를 위해 이전 대화 내용은 포함
      }

      console.log('🤫 서버로 조용히 프롬프트 전송:', payload)
      socket.emit('user-message', payload)
    },
    [socket, isConnected, isStreaming, messages]
  )

  // 대화 기록을 초기화하는 함수
  const resetConversation = useCallback(() => {
    if (!socket || !isConnected) return
    setMessages([]) // 즉각적인 UI 반영
    socket.emit(SOCKET_EVENTS.RESET_CONVERSATION)
    console.log('서버에 대화 기록 초기화 요청을 보냈습니다.')
  }, [socket, isConnected])

  // 훅이 제공하는 최종 결과물들
  return {
    messages,
    isStreaming,
    sendMessage,
    addLocalMessage,
    resetConversation,
    sendPromptSilently,
  }
}
