import { useState, useEffect, useRef } from 'react'
import mascot1 from '@/assets/section/benefit1.png'
import mascot2 from '@/assets/section/benefit2.png'
import mascot3 from '@/assets/section/benefit3.png'
import mascot4 from '@/assets/section/benefit4.png'

const mascotData = [
  { img: mascot1, label: '영화 보고' },
  { img: mascot2, label: '밥 먹고' },
  { img: mascot3, label: '쇼핑 하고' },
  { img: mascot4, label: '놀자' },
]

const logos = [
  '/logos/lg.png',
  '/logos/cgv.png',
  '/logos/onestore.png',
  '/logos/gs25.png',
  '/logos/brandB.png',
  '/logos/touslesjours.png',
  '/logos/megabox.png',
  '/logos/gsfresh.png',
  '/logos/uplus.png',
  '/logos/papajohns.png',
]

const BenefitCenterSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const [translateX, setTranslateX] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current
      if (!section) return

      const rect = section.getBoundingClientRect()
      const sectionTop = rect.top
      const sectionHeight = rect.height

      if (sectionTop <= 0 && Math.abs(sectionTop) < sectionHeight) {
        const ratio = Math.min(Math.abs(sectionTop) / sectionHeight, 1)
        const index = Math.floor(ratio * mascotData.length)
        if (index !== currentIndex && index < mascotData.length) {
          setAnimate(false)
          setTimeout(() => {
            setCurrentIndex(index)
            setAnimate(true)
          }, 100)
        }

        const totalWidth = logos.length * 160 * 4
        setTranslateX(ratio * totalWidth * 0.3)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [currentIndex])

  return (
    <section ref={sectionRef} className="relative h-[500vh]">
      {/* 커스텀 애니메이션 직접 정의 */}
      <style>
        {`
          @keyframes fadeSlideIn {
            0% {
              opacity: 0;
              transform: translateY(20px) scale(0.95);
            }
            100% {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          .animate-fadeSlideIn {
            animation: fadeSlideIn 0.5s ease-out;
          }
        `}
      </style>

      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-[#9b94fa] to-[#acc7f8]">
        <div
          className="absolute top-[50%] left-0 z-[1] flex gap-8 transition-transform duration-200 ease-out"
          style={{ transform: `translateX(-${translateX}px) translateY(-50%)` }}
        >
          {[...logos, ...logos, ...logos, ...logos].map((src, idx) => (
            <div
              key={idx}
              className="flex h-[150px] w-[150px] flex-none items-center justify-center rounded-full lg:h-[150px] lg:w-[150px]"
            >
              <img
                src={src}
                alt={`logo-${idx}`}
                className="max-h-[100%] max-w-[100%] object-contain"
              />
            </div>
          ))}
        </div>

        <div className="relative z-[2] flex h-full flex-col items-center justify-center">
          <img
            src={mascotData[currentIndex].img}
            alt="캐릭터"
            className={`mb-4 w-[250px] transition-all duration-500 lg:w-[350px] ${
              animate ? 'animate-fadeSlideIn' : ''
            }`}
          />
          <p
            className={`text-4xl font-bold text-white transition-opacity duration-500 ${
              animate ? 'animate-fadeSlideIn' : ''
            }`}
          >
            {mascotData[currentIndex].label}
          </p>
        </div>
      </div>
    </section>
  )
}

export default BenefitCenterSection
