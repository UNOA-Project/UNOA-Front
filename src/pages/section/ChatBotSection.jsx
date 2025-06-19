import React, { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import leftMockup from '../../assets/section/ChatBotiphone1.png'
import rightMockup from '../../assets/section/ChatBotiphone2.png'

const ChatBotSection = () => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize() // 초기 렌더링 시에도 실행
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: isMobile ? ['start end', 'start 5%'] : ['start end', 'center center'],
  })

  const leftY = useTransform(scrollYProgress, [0, 1], [200, 0])
  const leftOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const rightY = useTransform(scrollYProgress, [0, 1], [-100, 0])
  const rightOpacity = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section
      ref={sectionRef}
      className="bg-gradient-to-b from-[#acc7f8] to-white px-6 py-16 text-center"
    >
      <div className="flex flex-wrap items-end justify-center gap-[10rem]">
        {/* 왼쪽 */}
        <motion.div
          className="flex max-w-[400px] flex-col items-center text-center"
          style={{ y: leftY, opacity: leftOpacity }}
        >
          <h2 className="mb-6 text-center text-[1.4rem] font-bold text-[#222]">
            지금 나에게 맞는 요금제가 궁금하다면?
          </h2>
          {/* leftMockup 이미지에 그림자 추가 */}
          <img src={leftMockup} alt="설문 화면" className="w-full max-w-[400px]" />
        </motion.div>

        {/* 오른쪽 */}
        <motion.div
          className="flex max-w-[400px] flex-col items-center"
          style={{ y: rightY, opacity: rightOpacity }}
        >
          {/* rightMockup 이미지에 그림자 추가 */}
          <img src={rightMockup} alt="챗봇 화면" className="w-full max-w-[400px]" />
          <p className="mt-10 text-[1.3rem] font-bold text-[#333]">
            챗봇 NOA가 쉽고 빠르게 추천해드릴게요!
          </p>
          <button
            onClick={() => navigate('/chatbot')}
            className="mt-4 rounded-full bg-[#5590FF] px-10 py-3 font-bold text-white shadow-md transition-all duration-200 hover:bg-[#4076e0]"
          >
            요금제 추천 받기
          </button>
        </motion.div>
      </div>
    </section>
  )
}

export default ChatBotSection
