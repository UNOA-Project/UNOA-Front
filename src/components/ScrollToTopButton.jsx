import React, { useEffect, useState } from 'react'

const ScrollToTopButton = ({ isOpen }) => {
  //isOpen은 필터 모달이 띄워졌을때 비활성화 시키기 위해 사용
  const [visible, setVisible] = useState(false)
  const [isExpandedViewOpen, setIsExpandedViewOpen] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      const overflowContainer = document.querySelector('.overflow-y-auto')
      const containerScrollTop = overflowContainer ? overflowContainer.scrollTop : 0

      //모바일을 위한 변수
      const windowScrollY = window.scrollY || window.pageYOffset || 0

      setVisible(containerScrollTop > 300 || windowScrollY > 300)
    }

    toggleVisibility()

    const overflowContainer = document.querySelector('.overflow-y-auto')

    if (overflowContainer) {
      overflowContainer.addEventListener('scroll', toggleVisibility)
    }

    //모바일을 위한 함수 (모바일은 컨테이너가 스크롤 되지 않고 window자체가 스크롤 되기 때문에)
    window.addEventListener('scroll', toggleVisibility)

    return () => {
      if (overflowContainer) {
        overflowContainer.removeEventListener('scroll', toggleVisibility)
      }
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  // ExpandedView 상태 감지
  useEffect(() => {
    const checkExpandedViewState = () => {
      // PlanComparePageMobile의 motion.div 요소를 찾아서 data 속성 확인
      const mobileCompareElement = document.querySelector('[data-mobile-compare-expanded]')
      const isExpanded =
        mobileCompareElement?.getAttribute('data-mobile-compare-expanded') === 'true'
      setIsExpandedViewOpen(isExpanded)
    }

    // 초기 상태 확인
    checkExpandedViewState()

    // DOM 변경 감지를 위한 MutationObserver
    const observer = new MutationObserver(() => {
      checkExpandedViewState()
    })

    // body의 하위 요소들을 감시
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['data-mobile-compare-expanded'],
    })

    // compareUpdated 이벤트도 감지 (기존 이벤트 활용)
    const handleCompareUpdate = () => {
      setTimeout(checkExpandedViewState, 100) // 약간의 딜레이를 주어 DOM 업데이트 후 확인
    }

    window.addEventListener('compareUpdated', handleCompareUpdate)

    return () => {
      observer.disconnect()
      window.removeEventListener('compareUpdated', handleCompareUpdate)
    }
  }, [])

  // 필터 모달이 열려있거나 ExpandedView가 열려있으면 숨김
  if (isOpen || isExpandedViewOpen) return null

  const scrollToTop = () => {
    const overflowContainer = document.querySelector('.overflow-y-auto')

    if (overflowContainer) {
      overflowContainer.scrollTo({ top: 0, behavior: 'smooth' })
      overflowContainer.scrollTop = 0
    }
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      className={`hover:bg-gray-30 fixed right-1.5 bottom-22.5 z-9999 rounded-full border border-gray-200 bg-white p-3 shadow-lg transition-opacity duration-300 sm:right-6 sm:bottom-6 sm:p-2 ${
        visible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      aria-label="Scroll to top"
    >
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
