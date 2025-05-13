import React, { useEffect, useState } from 'react'
import { fetchCourseDetails } from '../services/operations/courseDetailsAPI'
import { useNavigate, useParams } from 'react-router-dom'
import { IoInformationCircleOutline } from "react-icons/io5";
import{ formatDate }from '../services/formateDate'
import toast from 'react-hot-toast';
import { FaRegShareSquare } from "react-icons/fa";
import  ConfirmationModal  from "../components/common/ConfirmationModal";
import { HiDesktopComputer } from "react-icons/hi";
import { useDispatch, useSelector } from 'react-redux';
import { BuyCourse } from '../services/operations/paymentAPI';

const CourseDetails = () => {

  const courseId = useParams()
  const navigate = useNavigate()
  const {token} = useSelector((state) => state.auth)
  const {paymentLoading} = useSelector((state) => state.course)
  const {user} = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  // const {_id} = useParams()

  const[course, setCourse] = useState([])
  const [confirmationModal, setConfirmationModal] = useState(null);
    // console.log("id",courseId)
    
  const getCourseDetails = async() => {
    const result = await fetchCourseDetails(courseId,token)
    setCourse(result)
  }
    useEffect(() => {
       
      getCourseDetails()
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },[courseId])
    
    // console.log("id", _id)
 
    const handleBuyCourse = () => {
      if(token) {
        BuyCourse(token, [courseId], user, navigate,dispatch)
        return
      }
      setConfirmationModal({
        text1: "You are not logged in!",
        text2:"Please login to Purchase Course.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler:() => navigate('/login'),
        btn2Handler: () => setConfirmationModal(null)
       })
    }

    const addToCart = () => {
      if(token) {
         
      }
      setConfirmationModal({
        text1: "You are not logged in!",
        text2:
              "Please login to add to cart",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate('/login'),
        btn2Handler: () => setConfirmationModal(null)
       })
    }
    
    
  if (paymentLoading) {
    // console.log("payment loading")
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

    //  console.log("length", course?.data?.courseContent?.subSection?.title )
    //to copy url 
    function copy() {
      const el = document.createElement("input");
      el.value = window.location.href;
      document.body.appendChild(el);
      el.select();
      document.body.removeChild(el);
      toast.success("Copied to clipboard")
      
    }
  return (
    <div className=''>
      {/* hero section */}
      <div className="bg-richblack-800 py-20 flex">
       <div className='ml-28 w-7/12 max-w-maxContent  relative flex flex-col gap-y-3 border-r-[1px] border-richblack-400'>
       <p className="text-richblack-400 text-xl font-medium">Home/ Learning /
        <span className='text-yellow-50'> {course?.data?.courseDetails?.category?.name}</span></p>
        <div>
        <p className="text-white text-3xl font-semibold">
            {course?.data?.courseName}
        </p>
        <p className="text-richblack-300 text-lg font-medium">
        {course?.data?.courseDescription}
        </p>
        <p className='text-white text-base font-medium'>
         Created By- {course?.data?.courseDetails?.instructor?.firstName} {course?.data?.courseDetails?.instructor?.lastName}</p>
        <p className='flex text-white text-base font-medium  gap-x-2 items-center'> 
        <IoInformationCircleOutline />
        <p>Created At- {formatDate(course?.data?.courseDetails?.instructor?.createdAt)}</p>
        </p>
       </div>

       <div className=' flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4'>
           <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5">Rs.{course?.data?.courseDetails?.price}</p>
           <button className='yellowButton' onClick={()=>handleBuyCourse}>
            Buy Now
           </button>
           <button className='blackButton' onClick={() => addToCart }>
            Add to Cart
           </button>
       </div>
        </div>
      
        <div className='absolute lg:block hidden bg-richblack-700 p-3 px-8 rounded-md right-40  gap-y-3'>
          <div className=''>
            <img src={course?.data?.courseDetails?.thumbnail} alt={course?.data?.courseDetails?.courseName}
              className='w-[240px] h-[150px] object-fit'
            />
          </div>
         <div>
         <p className="text-white text-xl font-medium"> Rs.{course?.data?.courseDetails?.price}</p>
         </div>
         <div className='flex flex-col gap-y-2'>
          <button className='text-black bg-yellow-50 py-1.5 w-full rounded-md'
           onClick={ handleBuyCourse}>
            
            Buy Now
           
          </button>
          

            <button className='text-white bg-richblack-800 border-b-[2px] border-richblack-400 py-1.5 w-full rounded-md'
             onClick={() => addToCart }
                >
            Add to cart
          </button>
          
        
         </div>
         <p className='text-richblack-200 text-sm mx-auto'>30-Day-Money-Back Guarantee</p>
         
         <button className='text-yellow-50 flex justify-center items-center gap-x-1' onClick={copy}>
         <FaRegShareSquare />
         <p>Share</p></button>
        </div>
        {/* RATING */}
      
      </div>

          {/* what you'll learn  */}
      <div className='border-richblack-100 border-[1px] rounded-md mt-10 py-3 px-5 ml-28 w-7/12 max-w-maxContent'>
            <p className='text-white text-2xl font-semibold'>What you'll learn</p>
            <p className='text-richblack-50 text-base font-medium'> {course?.data?.courseDetails?.whatYouWillLearn} </p>
      </div>

      {/* course content */}
       <div className='border-richblack-100 border-[1px] rounded-md mt-10 py-3 px-5 ml-28 w-7/12 max-w-maxContent'>
        <p className='text-white text-2xl font-semibold'>Course content</p>
       <div className='flex justify-between'>
       <div className='text-richblack-100 flex flex-row gap-x-5'>
          <li className=''>{course?.data?.courseDetails?.courseContent?.length} sections</li>
          {/* <li>{course?.data?.courseContent?.subSection?.length} lectures</li> */}
        </div>
       <details className='flex justify-between'>
      
        <summary className='text-white'>
          Collapse all section    </summary>
          <details>
            <summary className='flex justify-between'>
            <p>{course?.data?.courseDetails?.courseContent?.map((subsec, i) => (
              <div className='text-white'> {subsec?.sectionName} </div>
            ))}</p>
              {/* <p>{course?.data?.courseContent[0]?.subSection?.length} lectures</p> */}
            </summary>
            <p>
            <HiDesktopComputer />
           
            </p>
          </details>
     
       </details>
       </div>

       </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  )
}

export default CourseDetails