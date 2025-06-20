import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from '@/assets/Logo.svg'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const location = useLocation()

  const isHome = location.pathname === '/'

  // --- 기존 로직 ---
  const headerBgClass = isHome ? 'bg-transparent' : 'bg-white'
  const headerShadow = isHome ? '' : 'shadow-sm'

  // --- ✨ 1. 새로운 동적 클래스 변수 추가 ---
  // 홈페이지 여부에 따라 텍스트 색상 클래스를 동적으로 할당
  const headerTextColorClass = isHome ? 'text-white' : 'text-text-main'
  // 홈페이지 여부에 따라 모바일 메뉴 아이콘 색상 클래스를 동적으로 할당
  const menuIconColorClass = isHome ? 'bg-white' : 'bg-black'

  // --- ✨ 2. 활성 링크 스타일 수정 ---
  const navLinkBaseClass = 'hover:text-primary-purple transition-colors duration-200'
  // 홈페이지에서는 활성 링크 색상이 보라색이 아닌, 부모로부터 상속된 흰색을 사용하도록 수정
  const navLinkActiveClass = isHome
    ? 'relative font-bold' // 색상 지정을 없애서 부모(text-white) 색을 따르도록 함
    : 'text-primary-purple relative font-bold'

  const navItems = [
    { to: '/planlist', label: '요금제 한눈에 보기' },
    { to: '/chatbot', label: '요금제 추천 받기' },
    { to: '/mypage', label: '마이페이지' },
  ]

  return (
    <header
      className={`${isHome ? 'absolute' : 'fixed'} top-0 left-0 z-50 w-full ${headerBgClass} ${headerShadow}`}
    >
      <div className="mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16">    
        {/* 로고 (모바일) - 로고는 색상이 없으므로 수정 X */}
        <Link to="/" onClick={() => setIsMenuOpen(false)} className="lg:hidden">
          <img src={Logo} alt="U+NOA 로고" className="h-8" />
        </Link>

        {/* --- ✨ 3. 데스크탑 헤더에 텍스트 색상 적용 --- */}
        <div
          className={`text-card-title ${headerTextColorClass} hidden w-full items-center justify-between lg:flex`}
        >
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

        {/* --- ✨ 4. 모바일 메뉴 버튼에 아이콘 색상 적용 --- */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="relative flex h-8 w-8 flex-col items-center justify-center lg:hidden"
          aria-label="메뉴 버튼"
        >
          <span
            className={`absolute block h-[2px] w-6 ${menuIconColorClass} transition-transform duration-300 ease-in-out ${
              isMenuOpen ? 'rotate-45' : '-translate-y-2'
            }`}
          ></span>
          <span
            className={`absolute block h-[2px] w-6 ${menuIconColorClass} transition-opacity duration-300 ease-in-out ${
              isMenuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          ></span>
          <span
            className={`absolute block h-[2px] w-6 ${menuIconColorClass} transition-transform duration-300 ease-in-out ${
              isMenuOpen ? '-rotate-45' : 'translate-y-2'
            }`}
          ></span>
        </button>
      </div>

      {/* 모바일 메뉴 영역 */}
      <div
        className={`absolute top-15 left-0 z-40 w-full overflow-hidden transition-all duration-300 lg:hidden ${
          isMenuOpen ? 'max-h-[300px] pb-4 opacity-100' : 'max-h-0 opacity-0'
        } ${headerBgClass}`}
        style={{ boxShadow: isMenuOpen ? '0px 2px 4px rgba(0, 0, 0, 0.05)' : 'none' }}
      >
        {/* --- ✨ 5. 모바일 메뉴에 텍스트 색상 적용 --- */}
        <div
          className={`text-body ${headerTextColorClass} flex flex-col items-start space-y-4 px-6 pt-2 md:px-8 lg:px-16`}
        >
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
