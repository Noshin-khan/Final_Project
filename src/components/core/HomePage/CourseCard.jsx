import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {
  return (
    <div className={`font-inter w-[360px] lg:w-[30%] ${currentCard === cardData?.heading ? 
    "bg-white shadow-[12px_12px_0_0] shadow-yellow-50" : "bg-richblack-800"} 
    box-border cursor-pointer text-richblack-25 h-[300px]`} 
    onClick={() => setCurrentCard(cardData?.heading)}>
      <div className=' border-b-[2px] border-richblack-400 border-dashed gap-3 h-[80%] flex flex-col p-6'>

        <h2 className={`font-semibold  text-xl leading-7 
        ${currentCard  === cardData?.heading && " text-richblack-800 "} text-richblack-5` } >
        {cardData?.heading}</h2>
         <p className='  text-richblack-500'>
         {cardData?.description}</p>
        </div>
    
        <div className='flex flex-row justify-between font-inter mt-2 mx-2 mb-1'>
            <div className={`flex flex-row gap-1 font-medium text-base items-center leading-6
             ${currentCard === cardData?.heading && "text-blue-300"}`}>
                <HiUsers/>
                {cardData?.level}
            </div>
            <div className={`flex flex-row gap-1 font-medium text-base items-center leading-6 
            ${currentCard === cardData?.heading && "text-blue-300"}`}>
                <ImTree/>
                {cardData?.lessonNumber}
            </div>
        </div>
        
       
    </div>
  )
}

export default CourseCard