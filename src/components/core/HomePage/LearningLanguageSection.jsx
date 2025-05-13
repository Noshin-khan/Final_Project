import React from 'react'
import HighLightText from './HighLightText'
import CTAButton from './Button'
import know_your_progress from '../../../assets/Images/Know_your_progress.png'
import compare_with_others from '../../../assets/Images/Compare_with_others.png'
import plan_your_lesson from '../../../assets/Images/Plan_your_lessons.png'


const LearningLanguageSection = () => {
  return (
    <div className=''>
    <div className='font-inter text-center font-semibold text-4xl my-10'>
          Your swiss knife for 
          <HighLightText text={"learning any language"}/>
    </div>
    <div className='font-inter font-medium text-richblack-700 text-base mt-3 mx-auto lg:w-[75%] text-center '>
    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
    </div>
    <div className='flex flex-col lg:flex-row items-center justify-center mt-8 lg:mt-0'>
      <div>
        <img src={know_your_progress}
          alt='knowYourProgressImage'
          className='object-contain '
        />
      </div>
      <div>
        <img src={compare_with_others}
        alt='compareWithOthersImage'
        className='object-contain '
        />
      </div>
      <div>
        <img src={plan_your_lesson}
          alt='planYourLessonImage'
          className='object-contain'
        />
      </div>
    </div>
    <div className='-mt-5 mb-8 lg:mb-20 mx-auto w-fit'>
      <CTAButton active={true} linkto={"/signUp"}>
      Learn More
      </CTAButton>
    </div>
    </div>
  )
}

export default LearningLanguageSection