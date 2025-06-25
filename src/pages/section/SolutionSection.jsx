import React, { useEffect, useState, useRef } from 'react'
import mascot from '@/assets/section/solution.png'
import SolutionTextImg from '@/assets/section/Solutiontext.png'
import { motion, AnimatePresence } from 'framer-motion'

import chatbotImg from '@/assets/section/chatbot.png'
import easyModeImg from '@/assets/section/easy.png'
import compareImg from '@/assets/section/compare.png'

const STAGES = 4

const SolutionScrollSection = () => {
  const [stage, setStage] = useState(0)
  const [fillHeight, setFillHeight] = useState('0%')
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const introRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.3 }
    )

    if (introRef.current) observer.observe(introRef.current)
    return () => {
      if (introRef.current) observer.unobserve(introRef.current)
    }
  }, [])

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024)

    const handleScroll = () => {
      const viewportHeight = window.innerHeight
      const currentSection = sectionRef.current
      if (!currentSection || viewportHeight === 0) return

      const sectionTop = currentSection.offsetTop
      const relativeScroll = Math.max(0, window.scrollY - sectionTop)
      const currentStage = Math.min(STAGES - 1, Math.floor(relativeScroll / viewportHeight))
      setStage(currentStage)

      const animationStartScroll = viewportHeight
      const animationDuration = viewportHeight * 2
      let progress = 0
      if (relativeScroll > animationStartScroll) {
        progress = (relativeScroll - animationStartScroll) / animationDuration
      }
      const newFill = `${Math.min(1, Math.max(0, progress)) * 100}%`
      setFillHeight(newFill)
    }

    handleResize()
    handleScroll()
    window.addEventListener('resize', handleResize)
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const leftContents = [null, chatbotImg, easyModeImg, compareImg]
  const rightContents = [
    null,
    {
      image: '/images/right1.png',
      title: '챗봇을 통한 요금제 추천',
      description: 'LG U+ 요금제에 대해 NOA가 쉽게 알려드려요!',
    },
    {
      image: '/images/right2.png',
      title: '간단모드를 통한 요금제 추천',
      description: '글 입력이 어렵다면 추천 질문 버튼을 골라\n대화를 시작할 수 있어요!',
    },
    {
      image: '/images/right3.png',
      title: '요금제 한눈에 보고 비교까지',
      description: '다양한 요금제를 한눈에 확인할 수 있어요',
    },
  ]

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  }

  return (
    <section
      ref={sectionRef}
      className="relative h-[450vh] bg-gradient-to-b from-[#50a9e9] to-[#9b94fa]"
    >
      <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden text-white">
        {stage === 0 ? (
          <motion.div
            ref={introRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0, ease: 'easeOut' }}
            className="flex w-full flex-col items-center justify-center text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="mb-4 flex items-center justify-center gap-2"
            >
              <img
                src={SolutionTextImg}
                alt="Solution Text"
                className="h-auto w-[100px] sm:w-[120px] md:w-[150px] lg:w-[180px]"
              />
              <span className="mt-2 text-2xl font-bold sm:text-3xl md:text-4xl">
                가 해결해줍니다
              </span>
            </motion.div>
            <motion.img
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              src={mascot}
              alt="캐릭터"
              className="z-10 h-auto w-[160px] rounded-full sm:w-[200px] md:w-[240px]"
            />
          </motion.div>
        ) : (
          <>
            <div className="absolute flex h-full w-full items-end justify-center pb-6 lg:items-center">
              <div
                className={`relative ${isMobile ? 'h-[2px] w-4/5' : 'h-4/5 w-[2px]'} rounded-full bg-white/30`}
              >
                <div
                  className="absolute top-0 left-0 rounded-full bg-white"
                  style={{
                    height: isMobile ? '100%' : fillHeight,
                    width: isMobile ? fillHeight : '100%',
                    transition: 'width 0.3s ease-out, height 0.3s ease-out',
                  }}
                />
              </div>
            </div>

            <div className="relative flex h-full w-full flex-col items-center justify-center gap-8 px-6 text-center lg:flex-row lg:justify-between lg:px-8 lg:text-left xl:px-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`left-${stage}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex w-full justify-center lg:w-1/2 lg:justify-end"
                >
                  {leftContents[stage] && (
                    <img
                      src={leftContents[stage]}
                      alt="왼쪽 컨텐츠"
                      className="w-[350px] object-contain transition-all duration-300 md:w-[400px] lg:w-3/4"
                    />
                  )}
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`right-${stage}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  className="flex w-full flex-col items-center lg:w-1/2 lg:items-start"
                >
                  {rightContents[stage] && (
                    <div className="mt-0 flex flex-col items-center lg:mt-0 lg:ml-10 lg:items-start xl:ml-16">
                      <img
                        src={rightContents[stage].image}
                        alt={rightContents[stage].title}
                        className="h-auto w-[100px] sm:w-[120px] md:w-[140px] lg:w-[220px]"
                      />
                      <h3 className="mt-2 text-xl font-bold text-white sm:text-2xl md:text-3xl lg:text-4xl">
                        {rightContents[stage].title}
                      </h3>
                      <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-white/80 sm:text-base md:text-lg lg:text-xl">
                        {rightContents[stage].description}
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default SolutionScrollSection
