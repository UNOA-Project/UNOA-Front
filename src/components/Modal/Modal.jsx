import { useEffect, useRef } from 'react'
import XIcon from '@/assets/x-icon.svg?react'

export default function Modal({ isOpen, onClose, children, title }) {
  const modalRef = useRef()

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const handleClickOutside = e => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="relative max-h-[90vh] w-full max-w-3xl rounded-xl bg-white p-6 shadow-lg sm:p-8"
      >
        <div className="flex items-center justify-between">
          {title && <h2 className="text-lg font-bold sm:text-xl">{title}</h2>}
          <button
            onClick={onClose}
            className="flex items-center justify-center text-gray-500 hover:text-black"
            aria-label="모달 닫기"
          >
            <XIcon className="h-5 w-5" />
          </button>
        </div>

        <div className="max-h-[70vh] overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
