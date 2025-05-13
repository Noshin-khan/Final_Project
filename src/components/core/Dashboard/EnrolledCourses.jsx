import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { getUserEnrolledCourses } from '../../../services/operations/profileAPI'
import ProgressBar from "@ramonak/react-progress-bar"


const EnrolledCourses = () => {
    const [enrolledCourses, setEnrolledCourses] = useState(null)
    const {token} = useSelector((state) => state.auth)

    const getEnrolledCourses = async() => {
        try{
            const res = await getUserEnrolledCourses(token)
            setEnrolledCourses(res)
        }catch(error) {
            console.log("Unable to fetch Enrolled courses")
        }
    }

    useEffect(()=> {
        getEnrolledCourses();
                // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

  return (
    <div className='w-11/12 max-w-maxContent mx-auto'>
        <div className='text-white text-3xl'>
            <h1> Enrolled Courses </h1>
        </div>
        <div> 
        {
          !enrolledCourses ? (<div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
          <div className="spinner"></div>
        </div>) :
        !enrolledCourses.length ? (
            <p className="flex justify-center mt-8 h-[70vh] text-richblack-100">
          You have not enrolled in any course yet.
          
        </p>
        ) : 
           ( <div className='mt-14'>
               <div className='flex text-richblack-100 font-semibold rounded-t-lg bg-richblack-700 p-2'>
               <h1 className='w-[45%]'>Course Name</h1>
                <h1 className='w-1/4'>Durations</h1>
                <h1 className=''>Progress</h1>
               </div>
                {
                    enrolledCourses.map((course, i) => (
                        
                        <div key={i} className='flex p-4 border-[1px] border-richblack-700 '>
                      {  console.log("time",course)}

                           <div className='flex gap-x-3 w-[45%] '>
                          
                            <img src={course.thumbnail} alt={course?.courseName} 
                                className=' h-14 rounded-lg object-fit'
                            />
                         
                            <div className='flex flex-col'> 
                            <h1 className='text-white font-semibold'>{course.courseName}</h1>
                            <h1 className='text-richblack-200 '>{course.courseDescription}</h1>
                            </div>
                           </div>
                            <div className='text-white w-1/4'>
                                {course?.totalDuration || "2 hrs 20 mins"}
                            </div>

                            <div className='w-1/5'>
                                <p className='text-white'>Progress: {course.progressPercentage || 0}%</p>
                                <ProgressBar 
                                    completed={course.progressPercentage || 0}
                                    height='8px'
                                    isLabelVisible={false}
                                />

                            </div>
                        </div>
                       
                    ))
                }
            </div>)
        }
           
        </div>
    </div>
  )
}

export default EnrolledCourses
