import React, { useEffect, useState } from 'react'

const ScrollToTopButton = ({ isOpen }) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const overflowContainer = document.querySelector('.overflow-y-auto')

      if (overflowContainer) {
        setVisible(overflowContainer.scrollTop > 300)
      }
    }

    toggleVisibility()

    const overflowContainer = document.querySelector('.overflow-y-auto')

    if (overflowContainer) {
      overflowContainer.addEventListener('scroll', toggleVisibility)
    }

    return () => {
      if (overflowContainer) {
        overflowContainer.removeEventListener('scroll', toggleVisibility)
      }
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    const overflowContainer = document.querySelector('.overflow-y-auto')

    if (overflowContainer) {
      overflowContainer.scrollTo({ top: 0, behavior: 'smooth' })
      overflowContainer.scrollTop = 0
    }
  }

  if (isOpen) return null

  return (
    <button
      onClick={scrollToTop}
      className={`hover:bg-gray-30 fixed right-1.5 bottom-22.5 z-9999 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-opacity duration-300 sm:right-245.5 sm:bottom-6 sm:p-2 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      {/* Heroicons: chevron-up */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-black sm:h-6 sm:w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
      </svg>
    </button>
  )
}

export default ScrollToTopButton
