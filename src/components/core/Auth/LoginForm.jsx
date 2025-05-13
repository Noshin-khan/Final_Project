import React, { useState } from 'react'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {login} from '../../../services/operations/authAPI'


function LoginForm() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({ email:"", password:""})  
  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData

  const handleOnChange = (e) => {
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: e.target.value, 
      }))
  }

  const onSubmitHandler =(e) => {
       e.preventDefault()
       dispatch(login(email, password, navigate))
  }

  return (
     
        <form onSubmit={onSubmitHandler}
        className='w-full flex flex-col mt-6 gap-y-4' >
            <label className='w-full'>
                <p className='text-richblack-5 mb-1 text-sm leading-5'>Email Address<sup className='text-pink-200'>*</sup></p>
                <input type='email'
                  value={email}
                  name='email'
                  onChange={handleOnChange}
                  placeholder='Enter email address'
                  className='form-style w-full'
                />
            </label>
            
            
            <label className='relative'>
                <p className='text-richblack-5 mb-1 text-sm leading-5'> Password<sup className='text-pink-200'>*</sup></p>
                <input type={showPassword ? ("text") : ("password")}
                  value={password}
                  name='password'
                  onChange={handleOnChange}
                  placeholder='Enter Password'
                  className='w-full form-style'
                />
                <span onClick={ () => setShowPassword((prev) => !prev)}
                className='absolute right-3 top-[38px] cursor-pointer'>
                  {
                    showPassword ? 
                    (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                    (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)
                  }
                </span>
                <Link to='/forgot-password'> 
                      <p className='mt-1 ml-auto max-w-max text-xs text-blue-100'>
                       Forgot Password</p>
                </Link>
            </label>
            
            <button
             type='submit' 
             className='bg-yellow-50 text-richblack-900 w-full rounded-md mt-6 py-[8px] px-[12px] font-medium'>
                    Sign In
            </button>
        </form>
    
  )
}

export default LoginForm
