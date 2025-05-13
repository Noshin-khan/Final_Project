import React, { useEffect, useRef, useState }  from 'react';
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../common/IconBtn'
import { FiUpload } from "react-icons/fi";
import { updateDisplayPicture } from '../../../../services/operations/profileAPI';
import { useNavigate } from 'react-router-dom';

const UpdateProfilePhoto = () => {

    const {user} = useSelector((state) => state.profile)
    const {token} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [loading, setLoading] = useState(false)
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(null)
    const fileInputRef = useRef(null)

    const handleClick = () => {
        fileInputRef.current.click()
    }
    
    //select the file[first file]
    const handleFileChange = (e) => {
        const file = e.target.files[0]
        // console.log(file);
        if(file) {
            setImage(file)
        }
    }
    
    //to display the selected image on ui ie preview of the image 
    //bcoz we havenot actually uploaded it 
    useEffect (() => {
       if(image) {
        //it reads the url
        const reader = new FileReader()
        // console.log(reader)
        reader.onloadend = () => {
           setPreview(reader.result)
        } 
        reader.readAsDataURL(image)
       }
    },[image])

   const handleFileUpload = () => {
    try{
        console.log("uploading...")
        setLoading(true)
        const formdata = new FormData()
        formdata.append("displayPicture", image)
        console.log("formdata", formdata)
        dispatch(updateDisplayPicture(token, formdata, navigate)).then(() => {
            setLoading(false)
        })
    }catch(err) {
       console.log("ERROR MESSAGE - ", err.message)
    }
   } 
    
  return (
    <div className='flex gap-x-4 px-14 mt-8 py-8 rounded-md border-[1px] border-richblack-500 bg-richblack-800'>
     
        <img src={preview || user?.image}
            alt={`profile-${user?.firstName}`}
            className='aspect-square rounded-full max-w-[80px]'
        />
        <div className='flex flex-col justify-center'>
            <p className='text-white text-lg font-medium mb-2'>Change Profile Picture </p>
            <div className='flex gap-x-3'>
            <input
            type='file'
            className='hidden'
            ref={fileInputRef}
            onChange={handleFileChange}
            accept='image/png, image/jpeg, image/gif'
        />
                <button 
                onClick={handleClick}
                disabled={loading}
                className='text-richblack-100 bg-richblack-700 text-xl py-2 px-6 rounded-md'>Select</button>
                <IconBtn text={loading ? "Uploading..." : "Upload"}
                onclick={handleFileUpload}>
                
                {!loading && (
                    <FiUpload />
                )}
                </IconBtn>
            </div>
        </div>
    </div>
  )
}

export default UpdateProfilePhoto