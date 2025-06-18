// hooks/useSocket.js

import { useState, useEffect } from 'react'
import io from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // 소켓 연결
    const newSocket = io('http://localhost:5000', {
      forceNew: true, // 새로고침 시 새로운 연결을 강제합니다.
      reconnection: true,
      timeout: 10000, // 연결 타임아웃 10초
    })

    setSocket(newSocket)

    // 연결 성공 이벤트
    newSocket.on('connect', () => {
      console.log('✅ 소켓 ID로 서버에 연결됨:', newSocket.id)
      setIsConnected(true)
      // 'init-session' 이벤트는 그대로 유지합니다.
      // 서버에 새로운 채팅 세션을 준비하라고 알리는 좋은 방법입니다.
      console.log('📋 새로운 세션 시작 요청')
      newSocket.emit('init-session')
    })

    // 연결 끊김 이벤트
    newSocket.on('disconnect', () => {
      console.log('❌ 서버에서 연결이 끊겼습니다')
      setIsConnected(false)
    })

    // 연결 에러 이벤트
    newSocket.on('connect_error', error => {
      console.error('❌ 연결 에러:', error)
      setIsConnected(false)
    })

    // 컴포넌트 언마운트 시 소켓 연결 정리
    return () => {
      console.log('🔌 소켓 연결 정리')
      newSocket.close()
    }
  }, []) // 이 useEffect는 처음 한 번만 실행됩니다.

  return {
    socket,
    isConnected,
  }
}
