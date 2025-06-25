import React, { useRef, useEffect, useState } from 'react'
import mouse from '@/assets/section/mouse.png'
import TextAnimation from './TextAnimation'

const UoaLogo = () => {
  const svgRef = useRef(null)
  const [isDrawn, setDrawn] = useState(false)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const isMobile = window.innerWidth < 768
    const duration = isMobile ? 3.5 : 2

    const elements = svg.querySelectorAll('path, line')
    elements.forEach(el => {
      const length = el.getTotalLength?.()
      if (length) {
        el.style.strokeDasharray = length
        el.style.strokeDashoffset = length
        el.style.transition = `stroke-dashoffset ${duration}s ease`
      }
    })

    setTimeout(() => {
      setDrawn(true)
      elements.forEach(el => {
        if (el.style.strokeDashoffset !== undefined) {
          el.style.strokeDashoffset = 0
        }
      })
    }, 500)
  }, [])

  return (
    <div className="mx-auto flex min-h-[45vh] w-full max-w-[600px] items-center justify-center">
      <svg ref={svgRef} className="block h-auto w-full" viewBox="0 -10 250 70">
        <style>
          {`
            .draw {
              stroke-linecap: round;
              stroke-linejoin: round;
            }
          `}
        </style>
        <g transform="translate(5, 0)">
          <path
            d="M68 0 V20 M58 10 H78"
            className="draw"
            stroke="#e6007e"
            strokeWidth="8"
            fill="none"
          />
          <path
            d="M15 10 V40 C15 55, 45 55, 45 40 V10"
            className="draw"
            stroke="#e6007e"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M90 50 V10 L120 50 V10"
            className="draw"
            stroke="#543ed9"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M135 30 a19,19 0 1 1 40,0 a19,19 0 1 1 -40,0"
            className="draw"
            stroke="#543ed9"
            strokeWidth="10"
            fill="none"
          />
          <path
            d="M185 50 L205 10 L225 50 M195 38 H215"
            className="draw"
            stroke="#543ed9"
            strokeWidth="10"
            fill="none"
          />
        </g>
      </svg>
    </div>
  )
}

const SubSlogans = () => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`mt-4 transform text-center text-[1rem] text-[#888] transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <p>추천, 분석, 혜택 정리까지 한 곳에서</p>
      <p>나에게 딱 맞는 요금제 관리 도우미</p>
    </div>
  )
}

const Scrollecomment = () => {
  const [isVisible, setVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`mt-0 mb-40 pt-30 text-center text-[1rem] text-white transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
    >
      <p>scroll to view more</p>
      <img src={mouse} alt="scroll icon" className="mx-auto mt-2 w-[12px]" />
    </div>
  )
}

function HeroSection() {
  const sloganText = '한 번에 쉽게, 나한테 딱 맞게'

  return (
    <section className="flex flex-col items-center justify-center bg-black px-8 pt-[10%] text-center">
      <UoaLogo />
      <TextAnimation text={sloganText} startDelay={500} />
      <SubSlogans />
      <Scrollecomment />
    </section>
  )
}

export default HeroSection
