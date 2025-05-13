import React, { useState } from 'react'
import toast from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { setSignupData } from "../../../slices/authSlice"
import { sendOtp } from "../../../services/operations/authAPI"
import Tab from '../../common/Tab'
import {ACCOUNT_TYPE} from '../../../utils/constants'

const SignupForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   // student or instructor
   const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT)
   
  const [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:"",
    confirmPassword:"",
  })

  const { firstName, lastName, email, password, confirmPassword } = formData

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      
 // Handle input fields, when some value changes
  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) =>{
    e.preventDefault();
    // console.log("Printing form data");
    // console.log(formData);
    if(password !== confirmPassword) {
      toast.error("Password Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }
   
    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
   
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    //Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.STUDENT)
  }

   // data to pass to Tab component
   const tabData = [
    {
      id: 1,
      tabName: "Student",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ]

  return (
    <div>
    {/* Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* Form */}
      <form onSubmit={handleOnSubmit} className='flex w-fit flex-col gap-y-4'>
        <div className='flex gap-x-4'>
          <label>
            <p className="mb-1 text-sm leading-6 text-richblack-5">
              First Name<sup className="text-pink-200">*</sup>
            </p>
            <input type='text'
              name='firstName'
              value={firstName}
              onChange={handleOnChange}
              placeholder='Enter first name'
              className="form-style w-full"
            />
          </label>
          <label className="mb-1 text-sm mt-1 leading-6 text-richblack-5">
            <p>
              Last Name<sup className="text-pink-200">*</sup>
            </p>
            <input type='text'
              name='lastName'
              value={lastName}
              onChange={handleOnChange}
              placeholder='Enter last name'
              className="form-style w-full"
            />
          </label>
        </div>
          {/* email */}
         <div>
         <label className="mb-1 text-sm leading-6 text-richblack-5 ">
            <p>
              Email Address<sup className="text-pink-200">*</sup>
            </p>
            <input type='email'
              name='email'
              value={email}
              onChange={handleOnChange}
              placeholder='Enter email address'
              className="form-style w-full"
            />
          </label>
         </div>
         {/* Password */}
         <div className='flex gap-x-4'>
         <label className="mb-1 text-sm leading-6 text-richblack-5 relative">
            <p>
              Create Password<sup className="text-pink-200">*</sup>
            </p>
            <input type={showPassword ? ('text') : ('password')}
              name='password'
              value={password}
              onChange={handleOnChange}
              placeholder='Enter Password'
              className="form-style w-full"
            />
            <span 
            onClick={() => setShowPassword((prev) => !prev)}
            className='absolute right-2 translate-y-3 cursor-pointer'
            >
              {
                  showPassword ? 
                  (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) :
                  (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)

              }
            </span>
          </label>

          <label className="mb-1 text-sm leading-6 text-richblack-5">
            <p>
              Confirm Password<sup className="text-pink-200">*</sup>
            </p>
            <input type={showConfirmPassword ? ('text') : ('password')}
              name='confirmPassword'
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder='Confirm Password'
              className="form-style w-full"
            />
            <span 
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            className='absolute -translate-x-8 translate-y-3 cursor-pointer'
            >
              {
                  showConfirmPassword ? 
                  (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : 
                  (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)

              }
            </span>
          </label>
         </div>

         <button 
           type='submit'
           className='bg-yellow-50 text-richblack-900 rounded-md py-2 px-3  mt-6 font-medium'
           >Create Account
         </button>
        
      </form>
    </div>
  )
}

export default SignupForm