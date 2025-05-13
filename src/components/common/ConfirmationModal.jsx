import React from 'react'
import IconBtn from './IconBtn'

const ConfirmationModal = ({modalData}) => {
  return (
    <div className='grid justify-center fixed inset-0 backdrop-blur-sm bg-opacity-50 overflow-auto insert-0 flex-col
      py-4 items-center z-[10]'>
       <div className=' w-11/12 max-w-[350px] rounded-lg  border-[1px] border-richblack-400 bg-richblack-800 p-6 py-6'>
       <p className='text-richblack-5 text-xl font-semibold mb-1'>{modalData.text1}</p>
        <p className='text-richblack-200 text-base mb-4'>{modalData.text2}</p>
        <div className='flex gap-x-4 '>
            <IconBtn 
                onclick={modalData?.btn1Handler}
                text={modalData?.btn1Text}
            />
            <button onClick={modalData?.btn2Handler} 
            className='px-4 py-2 font-medium text-xl bg-richblack-200 text-black rounded-md'>
            {modalData?.btn2Text}
            </button>
        </div>
       </div>
    </div>
  )
}

export default ConfirmationModal