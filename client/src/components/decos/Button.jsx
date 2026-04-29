import React from 'react'

const Button = ({ icon: Icon, text , onClick, disabled }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`cursor-pointer text-sm sm:text-base flex gap-2 items-center px-5 py-3 sm:px-6 sm:py-3 rounded-xl bg-transparent text-white tracking-normal border border-blue-800 backdrop-blur-md shadow-[inset_0_0_10px_rgba(0,123,255,0.6)]
      transition-all duration-300 ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-blue-white/50 hover:scale-[0.95] hover:text-sky-100 hover:shadow-[inset_0_0_18px_rgba(0,123,255,0.6)]'}`}
    >
      <span>{text}</span>
      {Icon && !disabled && <Icon className="w-5 h-5" />}
      {disabled && (
        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
    </button>
  )
}

export default Button
