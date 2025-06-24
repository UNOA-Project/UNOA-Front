import { useAuth } from '@/contexts/AuthContext'
import UserNoPlan from '@/components/MyPage/UserNoPlan'
import UserPlan from '@/components/MyPage/UserPlan'
import NoUser from '@/components/MyPage/NoUser'
import NoPlanBenefit from '@/components/MyPage/NoPlanBenefit'
import Footer from '@/components/Footer'

export default function MyPage() {
  const { user } = useAuth()
  let content

  if (!user) {
    content = (
      <>
        <NoUser />
        <NoPlanBenefit />
      </>
    )
  } else if (user.user.isUplus) {
    content = <UserPlan />
  } else {
    content = (
      <>
        <UserNoPlan />
        <NoPlanBenefit />
      </>
    )
  }

  return (
    <div className="bg-gray-20 flex min-h-[calc(100vh-var(--header-height))] flex-col items-center gap-4 overflow-y-auto py-6 sm:gap-8 sm:pt-12">
      {content}
      <div className="bg-gray-20 w-full">
        <Footer />
      </div>
    </div>
  )
}
