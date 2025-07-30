import React from 'react'

const Button = ({ icon: Icon, text , onClick }) => {
  return (
    <button
      onClick={onClick}
      className="cursor-pointer text-sm sm:text-base flex gap-2 items-center px-5 py-3 sm:px-6 sm:py-3 rounded-xl bg-transparent text-white tracking-normal border border-blue-800 backdrop-blur-md shadow-[inset_0_0_15px_rgba(0,123,255,0.6)]
      hover:shadow-blue-500/40 transition-all duration-300 hover:scale-[0.95] hover:text-sky-100"
    >
      <span>{text}</span>
      {Icon && <Icon className="w-5 h-5" />}
    </button>
  )
}

export default Button
