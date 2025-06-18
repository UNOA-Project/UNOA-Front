import { createBrowserRouter } from 'react-router-dom'
import Layout from './Layout'
import MainPage from '@/pages/Mainpage'
import ChatbotPage from '@/pages/ChatbotPage'
import PlanListPage from '@/pages/PlanListPage'
import MyPage from '@/pages/Mypage'
import RegisterPage from '@/pages/RegisterPage'
import LoginPage from '@/pages/LoginPage'

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
    ],
  },
])

export default router
