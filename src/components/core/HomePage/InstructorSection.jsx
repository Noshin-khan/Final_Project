import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighLightText from './HighLightText'
import CTAButton from "../HomePage/Button"
import {FiArrowRight} from 'react-icons/fi';

const InstructorSection = () => {
  return (
    <div className='mt-16 flex lg:flex-row flex-col items-center gap-20'>
        <div className='lg:w-[50%]'>
            <img src={Instructor}
                alt='InstructorImage'
                className='shadow-[-10px_-10px_0px_2px_rgba(245,245,245,1)]'
            />
        </div>
        <div className=' flex lg:w-[50%] flex-col gap-5'>
        <div className='text-4xl font-inter font-semibold lg:w-[50%]'>
        Become an 
        <HighLightText text={"instructor"}/>
        </div>
        <p className='font-medium text-[16px] mb-16 text-justify w-[90%] text-richblack-300'>
        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
        </p> 
        
      
        <div className='w-fit'>
            <CTAButton active={true} >
            <div className='flex flex-row gap-2 items-center'>
            Start Teaching Today
            <FiArrowRight/>
            </div>
           
            </CTAButton>
        </div> 
        </div>
    </div>
  )
}

export default InstructorSection