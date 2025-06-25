import { useState } from 'react'
import PlanComparePage from '../components/PlanCompare/PlanComparePage'
import PlanComparePageMobile from '../components/PlanCompare/PlanComparePageMobile'
import PlanCardSystem from '@/components/ListPage/PlanCardSystem/PlanCardSystem'
import { Toaster } from 'react-hot-toast'

export default function PlanListPage() {
  const [onFilterModalState, setOnFilterModalState] = useState(false)
  return (
    <div className="w-full">
      {/* ✅ Toaster 실제 렌더링 */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          duration: 1500,
          className: 'with-progress',
          style: {
            background: '#fff',
            color: '#333',
            border: '1px solid #e5e7eb',
            fontSize: '14px',
          },
          success: {
            iconTheme: {
              primary: '#7c3aed',
              secondary: '#f3e8ff',
            },
          },
        }}
        containerClassName="mt-15"
      />

      {/* PC 화면 (xl 이상) */}
      <div className="fixed inset-0 hidden w-full xl:flex">
        <div className="h-full w-1/2 overflow-y-auto border-r border-gray-200 bg-[#F9FAFB] pt-[60px]">
          <PlanCardSystem />
        </div>
        <div className="h-full w-1/2 overflow-hidden">
          <PlanComparePage />
        </div>
      </div>

      {/* 모바일 및 중간 해상도 */}
      <div className="block min-h-screen overflow-y-auto bg-[#F9FAFB] pb-[60px] xl:hidden">
        <PlanCardSystem onFilterModalState={setOnFilterModalState} />
        {!onFilterModalState && <PlanComparePageMobile />}
      </div>
    </div>
  )
}
