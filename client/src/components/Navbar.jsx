import React from 'react'
import { Github, Star, Trash2 } from 'lucide-react'
import { useAppStore } from '../store/app.store'

const Navbar = () => {
  const { mode, setMode } = useAppStore();
  return (
    <div className="sticky top-0 z-50 w-full">
      <div className='w-full flex py-4 px-4 sm:px-10 justify-between items-center bg-transparent backdrop-blur-sm relative'>
        
        {/* Logo on left-side */}
        <div className='flex justify-center items-center cursor-pointer z-10'>
            <div>
                <img className='w-12 sm:w-16' src="/logo.png" alt="" />
            </div>
            <span className='text-white font-semibold text-xl sm:text-2xl opacity-75 hidden sm:block'>
              {mode === 'reaper' ? (
                <>Repo<span className='bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent'>Reaper</span></>
              ) : (
                <>Star<span className='bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent'>Sweeper</span></>
              )}
            </span>
        </div>

        {/* Mode Toggle Center */}
        <div className="bg-gray-900/60 p-1 rounded-xl flex items-center border border-gray-700 backdrop-blur-md absolute left-1/2 -translate-x-1/2 z-0">
          <button
            onClick={() => setMode('reaper')}
            className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${mode === 'reaper' ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Trash2 className="w-4 h-4 hidden sm:block"/> Reaper
          </button>
          <button
            onClick={() => setMode('sweeper')}
            className={`px-3 sm:px-6 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${mode === 'sweeper' ? 'bg-gradient-to-r from-yellow-500 to-orange-500 text-black shadow-lg' : 'text-gray-400 hover:text-white'}`}
          >
            <Star className="w-4 h-4 hidden sm:block"/> Sweeper
          </button>
        </div>

        {/* Right side Github Link */}
        <div className='sm:pr-10'>
            <a 
              href="https://github.com/kanak227/RepoReaper" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-center p-2 rounded-full bg-gray-900/50 hover:bg-gray-800 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white transition-colors shadow-sm"
              aria-label="View on GitHub"
            >
              <Github className="w-6 h-6" />
            </a>
        </div>
      </div>
    </div>
  )
}

export default Navbar
