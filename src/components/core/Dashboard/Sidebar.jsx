import React from 'react'
import { VscSignOut } from "react-icons/vsc"
import {sidebarLinks} from "../../../data/dashboard-links"
import { logout } from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ConfirmationModal from '../../common/ConfirmationModal'

const Sidebar = () => {

    const {user, loading: profileLoading} = useSelector((state) => state.profile)
    const {loading:authLoading} =  useSelector((state) => state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // to keep track of confirmation modal
  const [confirmationModal, setConfirmationModal] = useState(null)

    if(authLoading || profileLoading) {
        return(
            <div className='grid min-h-[100vh] place-items-center'>
                <div className='spinner'></div>
            </div>
        )
    }

  return (
    <div className='bg-richblack-800 lg:w-[15%] w-[30%] flex flex-col border-r-[1px] border-richblack-700
                    '>
        <div className='mt-10 flex flex-col '>
            {
                sidebarLinks.map((link,index) => {
                    if(link.type && user?.accountType !== link.type) return null;
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                    )
                })
            }
        </div>

        <div className='max-auto mt-6 mb-6 h-[1px] bg-richblack-600 w-11/12'></div>

        <div className='flex flex-col'>
            <SidebarLink link={{name:"Settings", path:"dashboard/settings"}}
                iconName="VscSettingsGear"
            />
        </div>

        <button onClick={() => setConfirmationModal( {
            text1:"Are You Sure?",
            text2:"You will be logged out of your account.",
            btn1Text:"Logout",
            btn2Text:"Cancel",
            btn1Handler:() =>dispatch(logout(navigate)),
            btn2Handler:() =>setConfirmationModal(null),
        })} >
            <div className='flex flex-row gap-2 px-8 py-2 text-base font-medium items-center text-richblack-400 '>
                <VscSignOut size={20}/>
                <h1 className=''>Logout</h1>
            </div>
        </button>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
    </div>
  
  )
}

export default Sidebar