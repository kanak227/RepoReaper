import React, { useState, useRef, useEffect } from 'react';
import { useAuthStore } from '../store/auth.store';
import { useAppStore } from '../store/app.store';
import { LogOut, Trash2, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const DashboardNavbar = ({img, user}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { logout } = useAuthStore();
    const { mode, setMode } = useAppStore();
    const dropdownRef = useRef(null);

    useEffect(() => {
      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

  return (
    <div>
      <div>
        <div className='w-full flex justify-between items-center bg-black mb-5 relative'>
          {/* Logo on left-side */}
          <div className='cursor-pointer z-10'>
              <a href="/" className='flex justify-center items-center '>
              <div>
                      <img className='w-14 sm:w-16' src="/logo.png" alt="" />
              </div>
              <span className='text-white  font-semibold text-xl sm:text-2xl opacity-75 hidden md:block'>
                {mode === 'reaper' ? (
                  <>Repo<span className='bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent'>Reaper</span></>
                ) : (
                  <>Star<span className='bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent'>Sweeper</span></>
                )}
              </span>
              </a>
          </div>

          {/* Mode Toggle Center */}
          <div className="bg-gray-900/60 p-1 rounded-xl flex items-center border border-gray-700 backdrop-blur-md absolute left-1/2 -translate-x-1/2 z-0 hidden sm:flex">
            <button
              onClick={() => setMode('reaper')}
              className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Trash2 className="w-4 h-4 hidden lg:block"/> Reaper
            </button>
            <button
              onClick={() => setMode('sweeper')}
              className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${mode === 'sweeper' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
            >
              <Star className="w-4 h-4 hidden lg:block"/> Sweeper
            </button>
          </div>

          {/* Right side login*/}
          <div className="relative" ref={dropdownRef}>
            <div 
              className={`rounded-full sm:px-2 p-[1.2px] md:mr-[10px] lg:mr-[50px] cursor-pointer transition-all ${mode === 'reaper' ? 'shadow-[inset_0_0_6px_#3b82f6] hover:shadow-[inset_0_0_10px_#3b82f6]' : 'shadow-[inset_0_0_6px_#eab308] hover:shadow-[inset_0_0_10px_#eab308]'}`}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
                <div className="flex items-center rounded-full px-3 py-[6px] bg-black/20 backdrop-blur-sm">
                    <img className="h-9 w-9 rounded-full sm:mr-3" src={img} alt="user" />
                    <span className="text-white tracking-wide text-lg hidden sm:inline sm:mr-2">{user}</span>
                </div>
            </div>
            
            <AnimatePresence>
            {dropdownOpen && (
              <motion.div 
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute right-0 md:right-[10px] lg:right-[50px] mt-3 w-56 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.8)] bg-black/60 backdrop-blur-xl ring-1 ring-white/10 z-50 border border-gray-800 overflow-hidden"
              >
                <div className="px-4 py-3 border-b border-gray-800 bg-gray-900/30">
                  <p className="text-xs text-gray-400 mb-1 tracking-wider uppercase">Signed in as</p>
                  <p className="text-sm font-bold text-white truncate">{user}</p>
                </div>
                <div className="p-2">
                  <button
                    onClick={() => logout()}
                    className="flex w-full items-center px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-500/10 hover:text-red-300 rounded-lg transition-colors group"
                  >
                    <LogOut className="mr-3 h-4 w-4 group-hover:scale-110 transition-transform" />
                    Sign out
                  </button>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardNavbar;
