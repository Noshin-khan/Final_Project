import React from 'react'
import { Link } from 'react-router-dom'
// 
const Button = ({ children, active, linkto }) => {
  
  return (
    <div>
        <Link to={linkto}>
        <div 
        className={` px-6 py-3 text-xs sm:text-base rounded-lg  font-bold shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] ${active ? "bg-yellow-50 text-richblack-900"
        : "bg-richblack-800 text-richblack-5" } hover:scale-95 hover:shadow-none transition-all duration-200`}>
            {children}
        </div>
        </Link>
    </div>
  )
}

export default Button