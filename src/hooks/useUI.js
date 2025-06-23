import { useEffect, useRef } from 'react'

export const useUI = (messages, currentMode) => {
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })

    if (currentMode === 'normal') {
      inputRef.current?.focus()
    }
  }, [messages, currentMode]) // 'messages' 또는 'currentMode'가 변경될 때마다 이 효과가 실행

  // 시간 포맷 함수
  const formatTime = timestamp => {
    if (!timestamp) return ''
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })
  }

  return { messagesEndRef, inputRef, formatTime }
}
