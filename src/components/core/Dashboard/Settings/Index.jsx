import React from 'react'
import UpdateProfilePhoto from './UpdateProfilePhoto'
import EditProfileInfo from './EditProfileInfo'
import UpdatePassword from './UpdatePassword'
import DeleteAccount from './DeleteAccount'

const Settings = () => {
  return (
    <div>
        <div className='text-white text-4xl font-medium'>
            <h1>Edit Profile</h1>
        </div>
        <div>
            <UpdateProfilePhoto/>
        </div>
        <div>
            <EditProfileInfo/>
        </div>
        <div>
            <UpdatePassword/>
        </div>
        <div>
            <DeleteAccount/>
        </div>
    </div>
  )
}

export default Settings