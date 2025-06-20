import { useRef } from 'react'
import HeroSection from './section/HeroSection'
import UserProblems from './section/UserProblems'
import SolutionSection from './section/SolutionSection'
import BenefitsSection from './section/BenefitsSection'
import ChatBotSection from './section/ChatBotSection'
import PlanComparePage from '../components/PlanCompare/PlanComparePage'

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
    </div>
  )
}

export default MainPage
