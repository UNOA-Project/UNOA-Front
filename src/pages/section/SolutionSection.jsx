import React, { useRef, useEffect, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import mascot from '../../assets/section/solution.png'
import SolutionTextImg from '../../assets/section/Solutiontext.png'

const TOTAL_BUBBLES = 20

const SolutionSection = () => {
  const { ref: sectionRef, inView } = useInView({ threshold: 0.7, triggerOnce: false })
  const containerRef = useRef(null)
  const [bubbles, setBubbles] = useState([])

  useEffect(() => {
    if (inView) {
      const generated = Array.from({ length: TOTAL_BUBBLES }, () => ({
        left: Math.random() * 90,
        scale: Math.random() * 0.1 + 0.5,
        delay: Math.random() * 1.5,
      }))
      setBubbles(generated)
    }
  }, [inView])

  return (
    <section
      ref={containerRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-gradient-to-b from-[#50a9e9] to-[#9b94fa] text-center font-['Lilita_One']"
    >
      {/* 애니메이션 정의 */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(0) scale(var(--scale, 0.7));
            opacity: 0.7;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateY(-120vh) scale(var(--scale, 1.3));
            opacity: 0;
          }
        }
      `}</style>

      {/* 비눗방울 */}
      {bubbles.map((b, i) => (
        <div
          key={i}
          className="absolute bottom-[-15em] z-[1] h-[10em] w-[10em] rounded-full border border-white/10 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03)_0%,rgba(255,255,255,0)_70%)] shadow-[inset_0_20px_30px_rgba(255,255,255,0.055),inset_1em_1em_1em_rgba(255,255,255,0.103),0_1em_2em_rgba(0,0,0,0.1)]"
          style={{
            left: `${b.left}%`,
            transform: `scale(${b.scale})`,
            animation: `floatUp 4s ease-out forwards`,
            animationDelay: `${b.delay}s`,
          }}
        />
      ))}

      {/* 콘텐츠 */}
      <div className="animate-fadeSlide z-[5] flex flex-col items-center text-white">
        <div
          ref={sectionRef}
          className={`flex h-[60%] w-full flex-col items-center justify-center rounded-full border-[6px] border-transparent p-2 transition-all duration-500 ${
            inView ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          <img
            src={SolutionTextImg}
            alt="Solution Text"
            className="mb-4 h-auto w-[60%] min-w-[300px]"
          />
          <img
            src={mascot}
            alt="캐릭터"
            className="z-10 h-auto w-[30%] min-w-[200px] rounded-full"
          />
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
