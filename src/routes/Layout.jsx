import Header from '@/components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  const location = useLocation()
  const isNoPaddingTop = location.pathname === '/' || location.pathname === '/login'

  return (
    <>
      <Header isNoPaddingTop={isNoPaddingTop} />
      <main className={isNoPaddingTop ? '' : 'pt-[var(--header-height)]'}>
        <Outlet />
        <ToastContainer limit={1} />
      </main>
    </>
  )
}
