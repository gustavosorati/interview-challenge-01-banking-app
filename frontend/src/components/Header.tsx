import { useContext } from 'react'
import { Link } from 'react-router-dom';
import logo from '../assets/logo.svg'
import { UserContext } from '../context/UserContext'

export function Header() {
  const {user, logout} = useContext(UserContext);

  return (
    <header className="flex flex-row items-center w-full justify-between py-4 px-12 mb-8">

      <Link to={"/"}>
        <img src={logo} alt="" className="w-20"  />
      </Link>

      {user.username ? (
        <div className="flex items-center gap-4 text-white">
          <div className='hover:text-purple-400 text-md'>{user.username}</div>
          <div className='hover:text-purple-400 text-md cursor-pointer' onClick={logout}>Logout</div>
        </div>
      ) : (
        <div className="flex items-center gap-4 text-white">
          <Link to={"/signin"} className='hover:text-purple-400 text-md'>
            Login
          </Link>
          <Link to={"/signup"} className='hover:text-purple-400 text-md'>
            Registre-se
          </Link>
          
        </div>
      )}
      
    </header>
  )
}