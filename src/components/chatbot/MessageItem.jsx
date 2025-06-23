import React from 'react'
import styles from './MessageItem.module.css'
import NoaIcon from '../../assets/noamessageicon.svg'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkBreaks from 'remark-breaks'
import PlanCardGroup from './PlanCard'

const MessageItem = ({ message, formatTime }) => {
  if (message.role === 'card') {
    return <PlanCardGroup plans={message.content} />
  }

  const messageClasses = [
    styles.message,
    styles[message.role],
    message.isStreaming ? styles.streaming : '',
    message.isTemp ? styles.temp : '',
  ].join(' ')

  // 마크다운 컴포넌트 커스터마이징
  const markdownComponents = {
    // 줄바꿈 처리
    p: ({children}) => <p className="mb-2">{children}</p>,
    // 코드 블록 스타일링
    code: ({inline, children}) => {
      if (inline) {
        return <code className="bg-gray-100 px-1 py-0.5 rounded text-sm">{children}</code>
      }
      return (
        <pre className="bg-gray-100 p-3 rounded overflow-x-auto">
          <code>{children}</code>
        </pre>
      )
    },
    // 리스트 스타일링
    ul: ({children}) => <ul className="list-disc list-inside mb-2">{children}</ul>,
    ol: ({children}) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
    // 링크 스타일링
    a: ({href, children}) => (
      <a href={href} target="_blank" rel="noopener noreferrer"
         className="text-blue-500 hover:underline">
        {children}
      </a>
    ),
  }

  return (
    <div className={styles.messageWrapper} data-role={message.role}>
      {message.role === 'assistant' && (
        <div className={styles.avatarContainer}>
          <img src={NoaIcon} alt="노아 아이콘" className={styles.avatarIcon} />
          <span className={styles.noaText}>NOA</span>
        </div>
      )}

      <div className={messageClasses}>
        <div className={styles.messageContent}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            components={markdownComponents}
            skipHtml={false}
            allowedElements={undefined} // 모든 HTML 요소 허용
          >
            {message.content}
          </ReactMarkdown>
        </div>
        <div className={styles.messageTime}>
          {formatTime(message.timestamp)}
          {message.isTemp && <span className={styles.tempIndicator}>전송중</span>}
        </div>
      </div>
    </div>
  )
}

export default MessageItem
