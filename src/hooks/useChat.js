import { useState, useEffect, useRef, useCallback } from 'react'

// 서버와 이벤트 이름을 동기화하여 관리
const SOCKET_EVENTS = {
  CONVERSATION_HISTORY: 'conversation-history',
  STREAM_START: 'stream-start',
  STREAM_CHUNK: 'stream-chunk',
  STREAM_END: 'stream-end',
  ERROR: 'error',
  USER_MESSAGE: 'user-message',
}

export const useChat = (socket, isConnected) => {
  const [messages, setMessages] = useState([])
  const [isStreaming, setIsStreaming] = useState(false)

  // 스트리밍 중인 메시지의 ID를 추적하기 위한 Ref
  const streamingMessageIdRef = useRef(null)

  useEffect(() => {
    if (!socket) return

    // 스트리밍 시작: AI 응답을 위한 빈 메시지 틀을 생성
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

    // 스트리밍 데이터 수신: 기존 메시지 틀에 내용을 추가
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

    // 스트리밍 종료: 스트리밍 상태를 false로 바꾸고 최종 메시지로 업데이트
    const handleStreamEnd = (data = {}) => {
      if (data.message && streamingMessageIdRef.current) {
        setMessages(prev =>
          prev.map(msg =>
            msg.id === streamingMessageIdRef.current
              ? { ...data.message, id: msg.id, isStreaming: false }
              : msg
          )
        )
      }
      setIsStreaming(false)
      streamingMessageIdRef.current = null
    }

    // 에러 처리
    const handleError = error => {
      console.error('소켓 에러 수신:', error.message)
      setIsStreaming(false)
    }

    // 서버에 연결되면 항상 빈 대화 기록을 받으므로, 메시지 목록을 초기화
    const handleConversationHistory = () => {
      setMessages([])
    }

    // 이벤트 리스너 등록
    socket.on(SOCKET_EVENTS.CONVERSATION_HISTORY, handleConversationHistory)
    socket.on(SOCKET_EVENTS.STREAM_START, handleStreamStart)
    socket.on(SOCKET_EVENTS.STREAM_CHUNK, handleStreamChunk)
    socket.on(SOCKET_EVENTS.STREAM_END, handleStreamEnd)
    socket.on(SOCKET_EVENTS.ERROR, handleError)

    // 컴포넌트 언마운트 시 리스너 정리
    return () => {
      socket.off(SOCKET_EVENTS.CONVERSATION_HISTORY, handleConversationHistory)
      socket.off(SOCKET_EVENTS.STREAM_START, handleStreamStart)
      socket.off(SOCKET_EVENTS.STREAM_CHUNK, handleStreamChunk)
      socket.off(SOCKET_EVENTS.STREAM_END, handleStreamEnd)
      socket.off(SOCKET_EVENTS.ERROR, handleError)
    }
  }, [socket])

  // UI에 시스템 메시지 등을 직접 추가하는 함수
  const addLocalMessage = useCallback((content, role = 'system') => {
    const localMessage = {
      id: `local-${role}-${Date.now()}`,
      role,
      content,
      timestamp: new Date().toISOString(),
    }
    setMessages(prev => [...prev, localMessage])
  }, [])

  // 서버로 메시지를 전송하는 함수
  const sendMessage = useCallback(
    (text, mode = 'normal') => {
      if (!text.trim() || isStreaming || !socket || !isConnected) return

      // 화면에 사용자 메시지를 즉시 표시
      const userMessage = {
        id: `user-${Date.now()}`,
        role: 'user',
        content: text.trim(),
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, userMessage])

      // 서버에 보낼 데이터: 새 메시지 + 이전 대화 목록 전체
      const payload = {
        text: text.trim(),
        mode: mode,
        history: messages,
      }

      socket.emit(SOCKET_EVENTS.USER_MESSAGE, payload)
    },
    [socket, isConnected, isStreaming, messages]
  )

  // 화면에 표시하지 않고, 서버로 프롬프트를 전송하는 역할만 합니다.
  const sendPromptSilently = useCallback(
    (promptText, mode = 'normal') => {
      if (!promptText.trim() || isStreaming || !socket || !isConnected) return

      // setMessages 로직이 없습니다!

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

  // 대화 내용 초기화
  const resetMessages = useCallback(() => {
    setMessages([])
  }, [])

  return {
    messages,
    isStreaming,
    sendMessage,
    addLocalMessage,
    resetMessages,
    sendPromptSilently,
  }
}
