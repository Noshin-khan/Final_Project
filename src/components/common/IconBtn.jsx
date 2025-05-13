import React from 'react'

const IconBtn = ({
    text,
    onclick,
    children,
    disabled,
    outline=false,
    custonClasses,
    type,
}) => {
  return (
    <button
    disabled={disabled}
    onClick= {onclick}
    type= {type}
    className={`flex gap-3 text-xl font-medium items-center text-black  ${
        outline ? "border border-yellow-50 bg-transparent " : "bg-yellow-50"
      } py-2 px-3 rounded-md`}>
    

        {
            children ? (
                <>
                  <span className={`${outline && "text-yellow-50 "}`}>
                     {text}
                  </span>
                     {children}
                </>
               
            ) : (text)
        }
    </button>
  )
}

export default IconBtn
