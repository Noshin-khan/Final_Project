import React, { useRef, useState } from 'react'
import { MdKeyboardArrowDown } from "react-icons/md";
import { VscDashboard, VscSignOut } from "react-icons/vsc"
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../../services/operations/authAPI';
// import useOnClickOutside from '../../../hooks/useClickOutside';

const ProfileDropDown = () => {

  const {user} = useSelector((state) => state.profile)
  const [open, setOpen] = useState(false);
  const ref = useRef(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // useOnClickOutside(ref, () => setOpen(false))

  return (
  <button onClick={()=> setOpen(!open)} className='relative'>
      <div className='flex gap-x-1'>
    
    {/* image */}
      <div ref={ref}>
        <img 
        src={user?.image}
        alt={`profile-${user?.firstName}`}
        className='rounded-full w-[30px] object-cover aspect-square'
        />
      </div>
      <MdKeyboardArrowDown className='text-base text-white mt-1'/>

      {open && (
        <div ref={ref}
         onClick={(e) => e.stopPropagation()}
        className='absolute top-[110%] divide-y-[1px] divide-richblack-700 flex flex-col  rounded-md  text-base border-[1px] border-richblack-700 bg-richblack-800'
        >
         <Link to='/dashboard/my-profile' onClick={() => setOpen(false)}>
         <h1 className='flex flex-row text-white w-full items-center py-[10px] px-[12px]  gap-x-1 hover:bg-richblack-700 hover:text-richblack-25' >
           <VscDashboard className=''/>
           DashBoard
           </h1>
         </Link>
           <h1 onClick={()=> {
            dispatch(logout(navigate))
            setOpen(false)
           }}
           className='flex flex-row w-full  py-[10px] px-[12px]  text-white items-center gap-x-1 hover:bg-richblack-700 hover:text-richblack-25'>
            <VscSignOut/>
            LogOut
           </h1>
        </div>
        
      )}
    </div>
  </button>
  )
}

export default ProfileDropDown