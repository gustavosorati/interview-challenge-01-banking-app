import {} from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function DefaultLayout() {
  return (
    <div className="flex flex-col min-h-screen items-center bg-gray-900 overflow-hidden">
      <Header />

      <main className='flex flex-col justify-center items-center w-screen  max-w-[920px]'>
        <Outlet />
      </main>
    </div>
  )
}