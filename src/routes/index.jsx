import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import MainPage from '@/pages/MainPage'
import ChatbotPage from '@/pages/ChatbotPage'
import PlanListPage from '@/pages/PlanListPage'
import MyPage from '@/pages/Mypage'
import RegisterPage from '@/pages/RegisterPage'
import LoginPage from '@/pages/LoginPage'
import KakaoExtraInfoPage from '@/pages/KakaoExtraInfoPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: 'register', element: <RegisterPage /> },
      { path: 'login', element: <LoginPage /> },
      { path: 'chatbot', element: <ChatbotPage /> },
      { path: 'planlist', element: <PlanListPage /> },
      { path: 'mypage', element: <MyPage /> },
      { path: 'kakao-extra-info', element: <KakaoExtraInfoPage /> },
    ],
  },
])

export default router
