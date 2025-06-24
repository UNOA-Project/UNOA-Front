import React, { useEffect, useState } from 'react'

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      setVisible(window.scrollY > 300)
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`fixed right-4 bottom-4 z-50 rounded-full bg-blue-600 p-3 shadow-lg transition-opacity duration-300 hover:bg-blue-700 sm:right-6 sm:bottom-6 sm:p-4 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Scroll to top"
    >
      {/* Heroicons: chevron-up */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 text-white sm:h-6 sm:w-6"
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
