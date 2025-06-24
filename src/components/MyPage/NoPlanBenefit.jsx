import { useEffect, useRef } from 'react'

export default function NoPlanBenefit() {
  const logos = [
    '/noplan/rolling_banner01.svg',
    '/noplan/rolling_banner02.svg',
    '/noplan/rolling_banner03.svg',
    '/noplan/rolling_banner04.svg',
    '/noplan/rolling_banner05.svg',
    '/noplan/rolling_banner06.svg',
    '/noplan/rolling_banner07.svg',
    '/noplan/rolling_banner08.svg',
    '/noplan/rolling_banner09.svg',
    '/noplan/rolling_banner10.svg',
  ]

  const containerRef = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const content = contentRef.current
    let x = 0

    content.innerHTML += content.innerHTML

    const animate = () => {
      x -= 1
      if (Math.abs(x) >= content.scrollWidth / 2) {
        x = 0
      }
      content.style.transform = `translateX(${x}px)`
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <div className="border-border w-[85%] overflow-hidden rounded-xl border bg-white py-6 sm:py-10 lg:w-[70%] 2xl:w-[50%]">
      <h2 className="max-[320px]:text-body text-sub-title sm:text-title mb-6 text-center font-bold sm:mb-10">
        <span className="text-lguplus">LG U+</span>에 가입하시면 <br className="block sm:hidden" />
        다양한 <span className="text-primary-purple">혜택</span>을 누릴 수 있어요!
      </h2>

      <div ref={containerRef} className="w-full overflow-hidden py-5 sm:py-10">
        <div ref={contentRef} className="flex items-center whitespace-nowrap will-change-transform">
          {logos.map((logo, idx) => (
            <img
              key={idx}
              src={logo}
              alt={`icon-${idx}`}
              className="mx-3 h-18 w-auto flex-shrink-0 sm:mx-6 sm:h-30"
            />
          ))}
        </div>
      </div>
    </div>
  )
}
