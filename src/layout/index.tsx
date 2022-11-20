import {} from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from '../components/Header'

export function DefaultLayout() {
  return (
    <div className="flex flex-col h-screen items-center bg-gray-900">
      <Header />

      <main className='flex flex-col items-center w-full h-screen max-w-[920px]'>
        <Outlet />
      </main>
    </div>
  )
}