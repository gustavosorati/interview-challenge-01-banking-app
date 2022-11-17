import logo from '../assets/logo.svg'


export function Header() {
  return (
    <header className="flex flex-row items-center justify-between py-4 px-12">
      <img src={logo} alt="" className="w-20"  />

      <div className="flex items-center gap-4 text-white">
        <a href="/signin" className='hover:text-purple-500 text-lg'>Login</a>
        <span className="w-[1px] bg-purple-500 h-[25px]"/>
        <a href="/signup" className='hover:text-purple-500 text-lg'>Registre-se</a>
      </div>
    </header>
  )
}