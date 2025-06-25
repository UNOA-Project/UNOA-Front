import { useState, useEffect } from 'react'
import io from 'socket.io-client'

export const useSocket = () => {
  const [socket, setSocket] = useState(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // 소켓 연결
    const newSocket = io(import.meta.env.VITE_BACK_URL, {
      forceNew: true,
      reconnection: true,
      timeout: 10000,
    })

    setSocket(newSocket)

    // 연결 성공 이벤트
    newSocket.on('connect', () => {
      setIsConnected(true)
      newSocket.emit('init-session')
    })

    // 연결 끊김 이벤트
    newSocket.on('disconnect', () => {
      setIsConnected(false)
    })

    // 연결 에러 이벤트
    newSocket.on('connect_error', error => {
      console.error('❌ 연결 에러:', error)
      setIsConnected(false)
    })

    // 컴포넌트 언마운트 시 소켓 연결 정리
    return () => {
      newSocket.close()
    }
  }, [])

  return {
    socket,
    isConnected,
  }
}
