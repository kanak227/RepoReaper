import React from 'react'
import Blob from './decos/Blob'
import Button from './decos/Button'
import { Github } from 'lucide-react'
import { useAuthStore } from '../store/auth.store'


const Navbar = () => {
  const {loginwithGithub} = useAuthStore();

  const handleLogin = ()=>{
    loginwithGithub();
  }
  return (
    <div>
        
      <div className='w-full flex py-4  p-3 justify-between items-center bg-black'>
        
        {/* Logo on left-side */}
        <div className='flex justify-center items-center sm:px-10 cursor-pointer'>
            <div>
                <img className='w-16' src="/logo.png" alt="" />
            </div>
            <span className='text-white  font-semibold text-2xl opacity-75'>Repo<span className='bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent'>Reaper</span> </span>
        </div>

        {/* Right side login*/}
        <div className='sm:pr-10'>
            <Button text="Login" icon={Github} onClick={handleLogin} />
        </div>
      </div>

    </div>
  )
}

export default Navbar
