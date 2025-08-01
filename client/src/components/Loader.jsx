import React from 'react'
import { Github } from 'lucide-react'
import { motion } from 'framer-motion'

const Loader = () => {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white gap-6">
      {/* Animated RepoReaper text */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Repo<span className="bg-gradient-to-r from-blue-500 via-blue-600 to-purple-500 bg-clip-text text-transparent">Reaper</span>
      </motion.h1>

      {/* Animated rotating GitHub icon */}
      <motion.div
        className="p-6 rounded-full border-2 border-blue-500 shadow-lg shadow-blue-700/30"
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 2,
        }}
      >
        <Github className="w-12 h-12 text-blue-600" />
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
        Reaping your repos...
      </motion.div>
    </div>
  )
}

export default Loader
