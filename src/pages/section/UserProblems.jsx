import React, { useEffect, useState } from 'react'

const problems = [
  '지금 요금제는 괜찮을까?',
  '놓치고 있던 혜택이 뭐가있지?',
  '너무 비싸게 쓰는 건 아니겠지?',
  '데이터는 남고, 음성은 부족하고..',
  '멤버십 혜택은 잘 받고 있는 걸까?',
  '이런 고민들',
]

const UserProblems = () => {
  const [bubbles, setBubbles] = useState([])
  const [isOverlayActive, setIsOverlayActive] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      const exclusionZoneStart = 20
      const exclusionZoneEnd = 70
      let top, left

      left = Math.random() * 80 + 5

      if (left > exclusionZoneStart && left < exclusionZoneEnd) {
        top =
          Math.random() < 0.5
            ? Math.random() * (exclusionZoneStart - 10) + 10 // 최소 10%
            : Math.random() * (85 - exclusionZoneEnd) + exclusionZoneEnd
      } else {
        top = Math.random() * 55 + 10 // 최소 10%, 최대 80%
      }

      const newBubble = {
        id: Date.now(),
        text: problems[Math.floor(Math.random() * (problems.length - 1))],
        top,
        left,
      }

      setBubbles(prev => [...prev, newBubble])
      setTimeout(() => {
        setBubbles(prev => prev.filter(b => b.id !== newBubble.id))
      }, 3000)
    }, 300)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const start = window.innerHeight
      const end = window.innerHeight * 2

      const isActive = scrollY > start && scrollY < end
      setIsOverlayActive(isActive)

      if (isActive) {
        const ratio = (scrollY - start) / (end - start)
        const idx = Math.floor(ratio * problems.length)
        setActiveIndex(Math.min(problems.length - 1, idx))
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="relative h-[200vh]">
      {/* 애니메이션 정의 */}
      <style>{`
        @keyframes floatInOut {
          0% {
            opacity: 0;
            transform: translateY(10px);
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 0;
            transform: translateY(-50px);
          }
        }
      `}</style>

      {/* 배경 및 비눗방울 */}
      <div className="sticky top-0 h-screen overflow-hidden bg-gradient-to-b from-black to-[#50a9e9]">
        {bubbles.map(b => (
          <div
            key={b.id}
            className="absolute animate-[floatInOut_4s_ease-in-out_forwards] rounded-full bg-white px-4 py-2 text-sm whitespace-nowrap text-gray-800 shadow-md"
            style={{ top: `${b.top}%`, left: `${b.left}%` }}
          >
            {b.text}
          </div>
        ))}
      </div>

      {/* 오버레이 슬로건 */}
      <div
        className={`fixed top-0 left-0 z-10 flex h-screen w-full items-center justify-center backdrop-blur-sm transition-opacity duration-1000 ${
          isOverlayActive ? 'bg-black/45 opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="relative flex h-[50vh] w-[90%] items-center justify-center text-center">
          {problems.map((text, i) => (
            <p
              key={i}
              className={`pointer-events-none absolute top-1/2 m-0 w-full -translate-y-1/2 font-semibold transition-all duration-500 will-change-[transform,opacity] ${
                i === activeIndex
                  ? 'text-[1.6rem] text-white opacity-100 sm:text-[1.6rem] md:text-[2rem] lg:text-[2.5rem] xl:text-[4rem]'
                  : 'text-[1rem] text-white/0 opacity-50 sm:text-[1.2rem] md:text-[1.2rem] lg:text-[2rem]'
              }`}
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}

export default UserProblems
