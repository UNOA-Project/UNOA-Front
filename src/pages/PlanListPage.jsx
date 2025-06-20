import { useEffect, useState } from 'react'
import PlanCardSystem from './../components/PlanCardSystem/PlanCardSystem'
import PlanComparePage from '../components/PlanCompare/PlanComparePage'
import PlanComparePageMobile from '../components/PlanCompare/PlanComparePageMobile'

export default function PlanListPage() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 1440)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="flex w-full">
      <PlanCardSystem />
      {!isMobile && <PlanComparePage />}
      {isMobile && <PlanComparePageMobile />}
    </div>
  )
}
