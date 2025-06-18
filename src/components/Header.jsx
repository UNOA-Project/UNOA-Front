import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Logo from '@/assets/Logo.svg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navLinkBaseClass = 'hover:text-primary-purple transition-colors duration-200'
  const navLinkActiveClass = 'text-primary-purple relative font-bold'

  const navItems = [
    { to: '/planlist', label: '요금제 한눈에 보기' },
    { to: '/chatbot', label: '요금제 추천 받기' },
    { to: '/mypage', label: '마이페이지' },
  ]

  return (
    <header className="relative z-50 w-full bg-white shadow-sm">
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-8 lg:h-20 lg:px-16">
        {/* 로고 */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="lg:hidden">
          <img src={Logo} alt="U+NOA 로고" className="h-8" />
        </Link>

        {/* 데스크탑 헤더 */}
        <div className="text-card-title text-text-main hidden w-full items-center justify-between lg:flex">
          <div className="flex items-center space-x-8">
            <Link to="/">
              <img src={Logo} alt="U+NOA 로고" className="h-10" />
            </Link>
            {navItems.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `${navLinkBaseClass} ${isActive ? navLinkActiveClass : ''}`
                }
              >
                {label}
              </NavLink>
            ))}
          </div>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              `${navLinkBaseClass} ${isActive ? navLinkActiveClass : ''}`
            }
          >
            로그인
          </NavLink>
        </div>

        {/* 모바일 메뉴 버튼 */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative flex h-8 w-8 flex-col items-center justify-center lg:hidden"
          aria-label="메뉴 버튼"
        >
          <span
            className={`absolute block h-[2px] w-6 bg-black transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`absolute block h-[2px] w-6 bg-black transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`absolute block h-[2px] w-6 bg-black transition-transform duration-300 ease-in-out ${
              isMenuOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          ></span>
        </button>
      </div>

      {/* 모바일 헤더 */}
      <div
        className={`absolute top-15 left-0 z-40 w-full overflow-hidden bg-white transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[300px] pb-4 opacity-100' : 'max-h-0 opacity-0'
        }`}
        style={{ boxShadow: isMenuOpen ? '0px 2px 4px rgba(0, 0, 0, 0.05)' : 'none' }}
      >
        <div className="text-body text-text-main flex flex-col items-start space-y-4 px-6 pt-2 md:px-8 lg:px-16">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) =>
                `${navLinkBaseClass} ${isActive ? navLinkActiveClass : ''}`
              }
            >
              {label}
            </NavLink>
          ))}
          <NavLink
            to="/login"
            onClick={() => setIsMenuOpen(false)}
            className={({ isActive }) =>
              `${navLinkBaseClass} ${isActive ? navLinkActiveClass : ''}`
            }
          >
            로그인
          </NavLink>
        </div>
      </div>
    </header>
  )
}
