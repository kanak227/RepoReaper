import React from 'react'

const DashboardNavbar = ({img : img , user:user}) => {
    
  return (
    <div>
      <div>
        
      <div className='w-full flex justify-between items-center bg-black mb-5'>
        
        {/* Logo on left-side */}
        <div className='cursor-pointer '>
            <a href="/" className='flex justify-center items-center '>
            <div>
                    <img className='w-16' src="/logo.png" alt="" />
            </div>
            <span className='text-white  font-semibold text-2xl opacity-75'>Repo<span className='text-white'>Reaper</span> </span>
            </a>
        </div>

        {/* Right side login*/}
        <div className="rounded-full sm:px-2 p-[1.2px] shadow-[inset_0_0_6px_#3b82f6] md:mr-[10px] lg:mr-[50px] ">
            <div className="flex items-center rounded-full px-3 py-[6px] bg-black/20 backdrop-blur-sm">
                <img className="h-9 w-9 rounded-full sm:mr-3" src={img} alt="user" />
                <span className="text-white tracking-wide text-lg hidden sm:inline sm:mr-2">{user}</span>
            </div>
        </div>
        
      </div>

    </div>
    </div>
  )
}

export default DashboardNavbar
