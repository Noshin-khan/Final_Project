import React from 'react'
import RenderSteps from './RenderSteps'

const AddCourse = () => {
  return (
    <div className='w-11/12 ml-3 max-w-maxContent  flex justify-between'>
        <div className="text-white flex flex-col text-2xl font-semibold">
            <h1>Add Course</h1>
       
        <div className=''>
            <RenderSteps/>
        </div>
        </div>
        <div className='bg-richblack-800  sticky hidden xl:block h-[45%] px-6 py-8  max-w-[40%] text-white
        border-[2px] border-richblack-700 rounded-md'>
        <div className='text-lg font-semibold mb-5'> <h1>⚡Course Upload Tips</h1></div>
        <div className='text-xs font-medium space-y-4 flex flex-col'>
            <li>Set the Course Price option or make it free.</li>
            <li>Standard size for the course thumbnail is 1024x576.</li>
            <li>Video section controls the course overview video.</li>
            <li>Course Builder is where you create & organize a course.</li>
            <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
            <li>Information from the Additional Data section shows up on the course single page.</li>
            <li>Make Announcements to notify any important</li>
            <li>Notes to all enrolled students at once.</li>
        </div>
           
        </div>
    </div>
  )
}

export default AddCourse
