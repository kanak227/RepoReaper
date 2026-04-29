import React from 'react'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'
import { useAppStore } from '../store/app.store'

const Loader = () => {
  const { mode } = useAppStore();
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-6">
      {/* Animated Logo text */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {mode === 'reaper' ? (
          <>Repo<span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent">Reaper</span></>
        ) : (
          <>Star<span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 bg-clip-text text-transparent">Sweeper</span></>
        )}
      </motion.h1>

      {/* Animated rotating GitHub icon */}
      <motion.div
        className={`p-6 rounded-full border-2 transition-colors duration-500 ${mode === 'reaper' ? 'border-blue-500 shadow-lg shadow-blue-700/30' : 'border-yellow-500 shadow-lg shadow-yellow-700/30'}`}
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 2,
        }}
      >
        <Github className={`w-12 h-12 transition-colors duration-500 ${mode === 'reaper' ? 'text-blue-600' : 'text-yellow-500'}`} />
      </motion.div>

      {/* Loading text with pulsing dots */}
      <motion.div
        className="text-lg text-slate-300 tracking-wide"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.2, 1, 0.2] }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "easeInOut",
        }}
      >
        {mode === 'reaper' ? 'Reaping your repos...' : 'Sweeping your stars...'}
      </motion.div>
    </div>
  )
}

export default Loader
