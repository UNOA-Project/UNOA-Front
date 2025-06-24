import { UserBenefitsSection } from '../components/Benefits/UserBenefitsSection'
import { useAuth } from '@/contexts/AuthContext'

export default function MyPage() {
  const { user } = useAuth()

  return <>{user && <UserBenefitsSection />}</>
}
