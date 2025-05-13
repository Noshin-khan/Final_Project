import React, { useState, useRef, useEffect } from 'react'
import {useDropzone} from 'react-dropzone'
import { Player } from 'video-react'
import { FiUploadCloud } from "react-icons/fi"
import "video-react/dist/video-react.css"



const Upload = ({
  name,
  label,
  register,
  setValue,
  errors,
  video = false,
  viewData = null,
  editData = null,
}) => {
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewImage, setPreviewImage] = useState(
    viewData ? viewData : editData ? editData : ""
  )
  // console.log(editData)
  const inputRef = useRef(null)

  const handleClick = () => {
    inputRef.current.click()
}

  const onDrop = (acceptedFiles) => {
       const file = acceptedFiles[0]
       if(file) {
        previewFile(file)
        setSelectedFile(file)
       }
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({
    accept: !video
      ? { "image/*": [".jpeg", ".jpg", ".png"] }
      : { "video/*": [".mp4"] },
    onDrop})

    const previewFile = (file) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onloadend = () => {
        setPreviewImage(reader.result)
      }
    }

    useEffect(() => {
      register(name, { required: true })
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [register])

    useEffect(() => {
      setValue(name, selectedFile)
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile, setValue])

  return (
    <div className='flex flex-col gap-y-2'>
    <label className='label-style'>{label} <sup className='text-pink-200 text-xs'>*</sup></label>
      <div className={`${isDragActive ? "bg-richblack-600" : "bg-richblack-700" } border-dotted border-[2px] rounded-lg border-richblack-600 aspect-video
       `}>
        {
          previewImage ?
           (<div className='flex w-full flex-col p-6'>
           {!video ? ( 
             <img
                src={previewImage}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            ) : (
             
                <Player aspectRatio='16:9' playsInline src={previewImage}/>
            
            )}
            {!viewData && (
              <button
                type="button"
                onClick={() => {
                  setPreviewImage("")
                  setSelectedFile(null)
                  setValue(name, null)
                }}
                className="mt-3 text-richblack-400 underline text-base mx-auto text-center flex"
              >
                Cancel
              </button>
            )}
         
           </div>) :
           (<div  {...getRootProps()} className='flex flex-col w-full items-center p-6'>
           <input {...getInputProps()} ref={inputRef}/>
           <div className=' rounded-full bg-richblack-800 p-2.5'>
            <FiUploadCloud className='text-2xl text-yellow-50'/>
           </div>
           <p className='mt-2 max-w-[200px] text-center text-sm text-richblack-200'>
            Drag and drop an {!video ? "image" : "video"}, or click to {" "}
            <span className='font-semibold text-yellow-50 cursor-pointer' onClick={handleClick} >Browse</span> a file
           </p>
           <ul className='mt-10 flex list-disc justify-between space-x-12 
           text-sm text-richblack-200 '>
            <li>Aspect ratio 16:9</li>
            <li>Recommend size 1024x576</li>
           </ul>
           
           </div>)
        }
      </div>
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
      )}
    </div>
  )
}

export default Upload