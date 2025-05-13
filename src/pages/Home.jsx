import React from 'react';
import {FiArrowRight} from 'react-icons/fi';

import {Link} from "react-router-dom"
import HighLightText from '../components/core/HomePage/HighLightText';
import CTAButton from '../components/core/HomePage/Button'
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import TimelineSection from '../components/core/HomePage/TimelineSection';
import InstructorSection from '../components/core/HomePage/InstructorSection'
import ExploreMore from '../components/core/HomePage/ExploreMore'; 
import Footer from '../components/common/Footer'

const Home = () => {
  return (
    <div>
    {/*Section 1 */}
     <div className='w-11/12  text-white mx-auto flex flex-col 
      justify-between relative max-w-maxContent items-center'>

      <Link to="/signUp" >
         <div className='bg-richblack-800 group p-[4px] font-semibold gap-[5px] mt-10 mb-3 w-fit rounded-full hover:scale-95 drop-shadow-[0_1.5px_rgba(255,255,255,0.25)] hover:drop-shadow-nonetransition-all duration-200 text-richblack-200 border-b border-richblack-200 '>
               <div className='flex flex-row items-center gap-2 pt-[6px] pr-[18px] pb-[6px] pl-[18px] group-hover:bg-richblack-900 rounded-full  transition-all duration-200'>
               <p>Become an Instructor</p>
               <FiArrowRight/>
              </div>
            </div>
      </Link>
        <div className='mt-4 flex flex-col  items-center'>
          <p className=' font-inter font-semibold text-4xl text-center leading-10 text-richblack-5'>
            Empower Your Future with 
            <HighLightText text={"Coding Skills"}/>
          </p>  
            <p className='font-inter mt-4 mb-4 text-base font-medium w-[80%] text-richblack-300 text-center leading-6 '>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a 
            wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
        </div>

        {/* Buttons */}
            <div className='gap-6 mt-8 flex flex-row'>
                <CTAButton active={true} linkto= {"/signUp"} >
                Learn More</CTAButton>
                <CTAButton active={false} linkto={"/login"} >Book a Demo</CTAButton>
            </div>

            {/* video */}
            <div className='mx-3 my-8 h-[40%] w-[80%] shadow-[10px_-5px_50px_-5px] shadow-blue-200'>
                <video
                className='shadow-[20px_20px_rgba(255,255,255)]'
                muted
                loop
                autoPlay>
                <source src={Banner} type="video/mp4"/>
                </video>
            </div>
            {/* Code Section 1 */}
            <div>
                <CodeBlocks 
                 position={"lg:flex-row"}
                heading = {
                    <div className='text-4xl font-semibold'>
                       Unlock your 
                       <HighLightText text={"coding potential "}/>  
                       with our online courses.
                    </div>
                }
                subheading = {
                        "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1 = {
                  {
                    btnText:"Try it Yourself",
                    linkto:"/signUp",
                    active: true,
                  } 
                }  
                ctabtn2 = {
                  {
                    btnText:"Learn More",
                    linkto:"/login",
                    active: false,
                  } 
                } 
              codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}
              codeColor={"text-yellow-25"}
              backgroundGradient={<div className="codeblock1 absolute"></div>}
                />
            </div>    
              

               {/* Code Section 2 */}
            <div>
            
            <CodeBlocks
            position={"lg:flex-row-reverse"}
            heading={
                <div className='w-[100%] text-4xl font-semibold lg:w-[50%]'>
                    Start 
                    <HighLightText text={"coding in seconds"}/>
                </div>
            }
            subheading={
                "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
            }
            ctabtn1={
              {
                btnText:" Continue Lesson",
                linkto:"/signUp",
                active: true,
              }  
            }
            ctabtn2={
              {
                btnText:"  Learn More",
                linkto:"/login",
                active:false,
              }  
            }
            codeblock={`import React from "react";\n import CTAButton from "./Button";\nimport TypeAnimation from "react-type";\nimport { FaArrowRight } from "react-icons/fa";\n\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
              codeColor={"text-richblack-5"}  
              backgroundGradient={<div className="codeblock2 absolute"></div>}
          />
           </div> 

           {/* Explore Section */}
           <ExploreMore/>
      </div>

    {/*Section 2 */}
      <div className='bg-pure-greys-5'>
      <div className='homepage_bg h-[320px]'>

        <div className='w-11/12 gap-6 max-w-maxContent mx-auto flex flex-col justify-between items-center'>
        <div className='lg:h-[150px]'></div>
          <div className='flex gap-7 lg:mt-8'>
            <CTAButton active={true} linkto={"/signUp"}>
            <div className='flex gap-2 items-center'>
            Explore Full Catalog
            <FiArrowRight/>
            </div>
           </CTAButton>

           <CTAButton active={false} linkto={"/login"}>
               Learn more
            </CTAButton>
          </div>
        </div>
      </div>

      <div className='w-11/12 max-w-maxContent mx-auto flex flex-col items-center justify-between gap-7 '>
        <div className='flex flex-col mt-[-100px] gap-7 justify-between lg:flex-row lg:gap-0 mb-10 lg:mt-20'>
          <div className='font-inter font-semibold text-4xl leading-10 lg:w-[45%]'>
          Get the skills you need for a 
          <HighLightText text={"job that is in demand."}/> 
          </div>
          <div className='flex flex-col lg:w-[40%] gap-10 items-start'>
            <p className='text-base font-medium'>
            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
            </p>
            <CTAButton active={true} linkto={"/signUp"}>
              <div>
              Learn More
              </div>
            </CTAButton>
          </div>
        </div>
        <TimelineSection />

        <LearningLanguageSection />
      </div>
   
     
      </div> 
    
      {/* Section 3 */}
      <div className='w-11/12 max-w-maxContent mx-auto flex flex-col justify-between items-center bg-richblack-900 text-white'>
            <InstructorSection/>
          <h2 className='font-inter font-semibold text-richblack-5 text-4xl mt-12'>Reviews from other learners</h2>
         {/* Review Slider here */}
      </div>   

       {/*Footer */}
       <Footer/>
</div>   
  )
}

export default Home