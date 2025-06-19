import Header from '@/components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Layout() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Header isHome={isHome} />
      <main className={isHome ? '' : 'pt-[var(--header-height)]'}>
        <Outlet />
        <ToastContainer limit={1} />
      </main>
    </>
  )
}
