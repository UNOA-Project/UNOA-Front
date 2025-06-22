import PlanCardSystem from '../components/ListPage/PlanCardSystem/PlanCardSystem'
import PlanComparePage from '../components/PlanCompare/PlanComparePage'
import PlanComparePageMobile from '../components/PlanCompare/PlanComparePageMobile'
export default function PlanListPage() {
  return (
    <div className="w-full">
      {/* PC 화면 (xl 이상) */}
      <div className="fixed inset-0 hidden w-full xl:flex">
        {/* 왼쪽 스크롤 영역 */}
        <div className="h-full w-1/2 overflow-y-auto border-r border-gray-200">
          <PlanCardSystem />
        </div>

        {/* 오른쪽 고정 영역 */}
        <div className="h-full w-1/2 overflow-hidden">
          <PlanComparePage />
        </div>
      </div>

      {/* 모바일 및 중간 해상도 */}
      <div className="block min-h-screen overflow-y-auto xl:hidden">
        <PlanCardSystem />
        <PlanComparePageMobile />
      </div>
    </div>
  )
}
