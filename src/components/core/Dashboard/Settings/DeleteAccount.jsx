import React from 'react'
import { RiDeleteBin5Line } from "react-icons/ri";
import { deleteAccount } from '../../../../services/operations/profileAPI';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const DeleteAccount = () => {

  const {token} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function handleDeleteAccount() {
    try{
       dispatch(deleteAccount(token, navigate))
    }catch(error) {
     console.log("ERROR MESSAGE - ", error.message)
    }
}


  return (
    <div className='flex gap-x-5 pl-10 p-6 my-10 rounded-md bg-pink-900 border-[2px] border-pink-700'>
    <div>
    <div className='rounded-full p-3 text-2xl  bg-pink-100'>
        <RiDeleteBin5Line />
    </div>
    </div>
        
         <div className=''>
         <h1 className='text-white font-semibold text-xl'>Delete Account</h1>
         <p className='text-pink-50'>Would you like to delete account?</p>
         <p className='text-pink-50'>This account may contain Paid Courses. Deleting your account is permanent and will remove all the contain associated with it.
        </p>
        <button type='button' className='text-pink-500 italic w-fit' 
        onClick={handleDeleteAccount}
        >I want to delete my account.</button>
         </div>
      
    </div>
  )
}

export default DeleteAccount