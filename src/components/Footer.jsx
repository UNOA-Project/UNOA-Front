import GithubIcon from '@/assets/github.svg?react'
import FigmaIcon from '@/assets/figma.svg?react'
import UnoalgIcon from '@/assets/UNOA_LG.svg?react'
import NotionIcon from '@/assets/notion.svg?react'
import CopyrightIcon from '@/assets/copyright.svg?react'

const Footer = () => {
  return (
    <footer className="w-full">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center gap-8 px-4 py-8 sm:relative sm:-left-6 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        {/* 왼쪽 로고 영역 */}
        <div className="flex w-full justify-center sm:w-1/3 sm:justify-start">
          <UnoalgIcon className="h-[clamp(1.75rem,3vw,2.25rem)]" />
        </div>

        {/* 중앙 카피라이트 영역 */}
        <div className="flex w-full items-center justify-center text-xs sm:w-1/3 sm:text-sm">
          <CopyrightIcon className="h-10 w-full max-w-sm sm:ml-12" />
        </div>

        {/* 오른쪽 아이콘 영역 */}
        <div className="flex w-full items-center justify-center space-x-7 sm:w-1/3 sm:justify-end">
          <a
            href="https://github.com/UNOA-Project"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Github"
          >
            <GithubIcon className="h-[clamp(1.25rem,2.5vw,1.75rem)] w-[clamp(1.25rem,2.5vw,1.75rem)]" />
          </a>
          <a
            href="https://fern-cesium-085.notion.site/01-UNOA-You-know-NOA-203303b4c814802d9b9ad1fe21f34684"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Notion"
          >
            <NotionIcon className="h-[clamp(1.25rem,2.5vw,1.75rem)] w-[clamp(1.25rem,2.5vw,1.75rem)]" />
          </a>
          <a
            href="https://www.figma.com/design/KBt5oYt5mAsCMx3QqdSzt0/%EC%A2%85%ED%95%A9%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8_1%EC%A1%B0?node-id=164-67&p=f&t=CAzBbbuAxsF1DXZr-0"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Figma"
          >
            <FigmaIcon className="h-[clamp(1.25rem,2.5vw,1.75rem)] w-[clamp(1.25rem,2.5vw,1.75rem)]" />
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
