import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import TimeLineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
  {
    Logo: Logo1,
    heading:"Leadership",
    Description:"Fully committed to the success company",
  },
  {
    Logo: Logo2,
    heading: "Responsibility",
    Description:"Students will always be our top priority",
  },
  {
  Logo: Logo3,
  heading: "Flexibility",
  Description:"The ability to switch is an important skills",
  },
  {
    Logo: Logo4,
    heading: "Solve the problem",
    Description:"Code your way to a solution",
  }
 
]

const TimelineSection = () => {
  return (
    
    <div className='gap-20 mb-20 flex-col lg:flex-row flex items-center'>
        <div className='lg:w-[45%] flex flex-col gap-14 lg:gap-10'>
        {
          timeline.map((element, index)=> {
            return (
              <div className='flex flex-row lg:gap-3 ' key={index}>
              <div className={` ${
                timeline.length - 1 === index ? "hidden" : "lg:block"
              } lg:h-24 h-28  border-dotted border-r absolute border-richblack-100 w-[26px]`}
              ></div>
              <div className='w-[52px] h-[52px] relative bg-white rounded-full flex items-center justify-center shadow-[#00000012] shadow-[0_0_62px_0] '>
                <img src={element.Logo} alt='logo'/>
              </div>
              
           
             
              <div>
                <h2 className='font-semibold text-lg font-inter text-richblack-800'>
                {element.heading}</h2>
               
                <p className='text-sm font-normal font-inter text-richblack-700'>
                {element.Description}</p>
              </div>
              
            
            </div>
           
            );
          })
        }
     </div>
     <div className="relative w-fit h-fit shadow-blue-200 shadow-[0px_0px_30px_0px]">
          <div className="absolute lg:left-[50%] left-[25%] bottom-[0%] lg:bottom-0 lg:translate-x-[-50%] lg:translate-y-[50%] bg-caribbeangreen-700 flex lg:flex-row flex-col text-white uppercase py-2 gap-1 px-1 lg:gap-0 lg:py-10 ">
            {/* Section 1 */}
            <div className="flex gap-5 items-center lg:border-r border-caribbeangreen-300 px-7 lg:px-14">
              <h1 className="text-3xl font-bold w-[75px]">10</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                Years experiences
              </h1>
            </div>

            {/* Section 2 */}
            <div className="flex gap-5 items-center lg:px-14 px-7">
              <h1 className="text-3xl font-bold w-[75px]">250</h1>
              <h1 className="text-caribbeangreen-300 text-sm w-[75px]">
                types of courses
              </h1>
            </div>
            <div></div>
          </div>
          <img
            src={TimeLineImage}
            alt="timelineImage"
            className="shadow-white shadow-[20px_20px_0px_0px] object-cover h-[400px] lg:h-fit"
          />
        </div>
      </div>
  
  )
}

export default TimelineSection