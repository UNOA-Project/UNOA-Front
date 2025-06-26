import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import leftMockup from '@/assets/section/ChatBotiphone1.png'
import rightMockup from '@/assets/section/ChatBotiphone2.png'
import './ChatBotButton.css' // CSS 파일 import

const ChatBotSection = () => {
  const sectionRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)
  const navigate = useNavigate()
  const MotionButton = motion.button
  const Motiondiv = motion.div
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    handleResize()
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
        <Motiondiv
          className="flex max-w-[400px] flex-col items-center text-center"
          style={{ y: leftY, opacity: leftOpacity }}
        >
          <h2 className="mb-6 text-center text-[1.2rem] font-bold text-[#222] md:text-[1.3rem] lg:text-[1.4rem]">
            지금 나에게 맞는 요금제가 궁금하다면?
          </h2>
          <img src={leftMockup} alt="설문 화면" className="w-full max-w-[400px]" />
        </Motiondiv>

        {/* 오른쪽 */}
        <Motiondiv
          className="flex max-w-[400px] flex-col items-center"
          style={{ y: rightY, opacity: rightOpacity }}
        >
          <img src={rightMockup} alt="챗봇 화면" className="w-full max-w-[400px]" />
          <p className="mt-10 text-[1.2rem] font-bold break-keep whitespace-normal text-[#333] md:text-[1.1rem] lg:text-[1.3rem]">
            챗봇 NOA가 쉽고 빠르게 추천해드릴게요!
          </p>
          <MotionButton
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate('/chatbot')}
            className="bg-primary-purple relative z-10 mt-4 rounded-full px-14 py-5 font-bold text-white shadow-md transition-all duration-200"
          >
            요금제 추천 받기
            <img
              src="/images/cursor.svg"
              alt="cursor"
              className="animate-float pointer-events-none absolute right-4 bottom-0 h-8 w-8"
            />
          </MotionButton>

          {/* 커서 아이콘: 버튼 외부에 위치시킴 */}
        </Motiondiv>
      </div>
    </section>
  )
}

export default ChatBotSection
