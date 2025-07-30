import React from 'react'

const Blob = ({ className = '' }) => {
  return (
    <div
      className={`bg-gradient-to-br from-blue-500 via-sky-400 to-cyan-300 rounded-full blur-3xl opacity-60 animate-blob ${className}`}
    ></div>
  )
}

export default Blob
