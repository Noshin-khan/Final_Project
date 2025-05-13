import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { BiArrowBack } from "react-icons/bi"
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { resetPassword } from '../services/operations/authAPI'
import { useState } from 'react'
import ReactPasswordChecklist from 'react-password-checklist'


function UpdatePassword() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const location = useLocation()
   const {loading} = useSelector((state) => state.auth);
   const [formData, setFormData] = useState({password:"", confirmPassword:""})

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {password, confirmPassword} = formData

    const handleOnChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        const token = location.pathname.split("/").at(-1)
        dispatch(resetPassword(password, confirmPassword, token, navigate))
    }
  return (
    <div className='h-[89vh] flex justify-center items-center'>
        {
            loading ? (
                <div className='spinner'> Loading...</div>
            ) : (
                <div className='max-w-[500px] p-8  lg:p-8 font-inter'>
                    <h1 className='text-richblack-5 font-semibold text-3xl'>Choose new password</h1>
                    <p className='text-richblack-100 font-normal text-lg mb-4'>Almost done. Enter your new password and you are all set.</p>
                    <form onSubmit={onSubmitHandler} className='flex gap-3 flex-col'>
                       <label className='relative'>
                          <p className='text-richblack-5'>New Password <sup className='text-pink-200'>*</sup></p>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            name='password'
                            onChange={handleOnChange}
                            placeholder='Enter Password'
                            className='form-style w-full !pr-10'
                           />
                           <span onClick={() => setShowPassword((prev)=> !prev)}
                           className='absolute -translate-x-9 translate-y-2.5'>
                            {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                                            (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                           </span>
                       </label>

                       <label className='relative'>
                          <p className='text-richblack-5'>Confirm new password <sup className='text-pink-200'>*</sup></p>
                          <input
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            name='confirmPassword'
                            onChange={handleOnChange}
                            placeholder='Confirm Password'
                            className='form-style w-full !pr-10'
                           />
                           <span onClick={() => setShowConfirmPassword((prev)=> !prev)}
                           className='absolute -translate-x-9 translate-y-2.5'>
                            {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                                            (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
                           </span>
                       </label>

                       <ReactPasswordChecklist 
                        rules={["capital", "specialChar", "number", "lowercase","match"]}
                        minLength={8}
                        value={password}
                        valueAgain={confirmPassword}
                        className='text-richblack-5 '
                       />
                       
                       <button type='submit' 
                       className='bg-yellow-50  text-richblack-900  font-medium text-base p-2 rounded-md mt-4 w-full mb-6'>
                       Reset Password</button>
                    </form>

                    <div className='text-richblack-100'>
                    <Link to='/login'>
                        
                        <p className='flex gap-2 items-center'>
                        <BiArrowBack/>
                        Back to login</p>
                    </Link>
                        
                    </div>
                </div>
                
            )
        }
    </div>
  )
}

export default UpdatePassword