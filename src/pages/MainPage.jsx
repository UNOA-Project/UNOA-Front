import { useRef } from 'react'
import HeroSection from './section/HeroSection'
import UserProblems from './section/UserProblems'
import SolutionSection from './section/SolutionSection'
import BenefitsSection from './section/BenefitsSection'
import ChatBotSection from './section/ChatBotSection'
import Footer from '../components/Footer'
import ScrollToTopButton from '@/components/ScrollToTopButton'

function MainPage() {
  const solutionRef = useRef(null)

  return (
    <div className="[&>section]:-mt-px">
      <HeroSection />
      <UserProblems scrollTargetRef={solutionRef} />
      <div ref={solutionRef}>
        <SolutionSection />
      </div>
      <BenefitsSection />
      <ChatBotSection />
      <Footer />
      <ScrollToTopButton className="right-5 bottom-7 sm:bottom-6" />
    </div>
  )
}

export default MainPage
