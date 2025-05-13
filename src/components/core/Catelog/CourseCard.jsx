import React from 'react'
import { Link } from 'react-router-dom'



const CourseCard = ({course,Height}) => {

  // const {course} = useSelector((state) => state.course)

    // console.log('c',course)
    
  return (
    <div className='mt-6 flex flex-col mb-4'>
    <Link to={`/course/${course?._id}`}>
   <div> <img src={course?.thumbnail} alt={course?.coureName} className={`${Height} w-full object-cover rounded-md`} /></div>
    {/* name and des */}
  <div className='flex flex-col mt-1'>
  <p className='text-white text-xl font-semibold'>{course?.courseName} </p>
    <p className=' text-base text-richblack-100'>{course?.courseDescription}  </p>
    
  </div>
  {/* Instructor */}
  <p></p>

  {/* Review */}

  {/* price */}
  <p>Rs. {course?.price}</p>
    </Link>
      
   
       

    
    </div>
  )
}

export default CourseCard