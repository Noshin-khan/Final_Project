import React from 'react'

import FoundingStory from "../assets/Images/FoundingStory.png"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import Footer from '../components/common/Footer'
import HighLightText from '../components/core/HomePage/HighLightText'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'


const About = () => {
  return (
    <div>
    <section className='bg-richblack-800 '>
        <div className=' relative w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center'>
            <div className='text-richblack-200 font-inter font-semibold text-base leading-6 text-center pt-14'>About Us</div>  
            <header className='text-richblack-5 font-semibold text-4xl leading-10 lg:w-[75%] py-10 text-center'>
            Driving Innovation in Online Education for a
            <HighLightText text={"Brighter Future"}/>
            <p className='text-richblack-200 mt-3 font-inter font-medium mx-auto text-sm leading-6 text-center lg:w-[90%]'>
              Studynotion is at the forefront of driving innovation in online
              education. We're passionate about creating a brighter future by
              offering cutting-edge courses, leveraging emerging technologies,
              and nurturing a vibrant learning community.
            </p> 
            </header>
            <div className='sm:h-[70px] lg:h-[250px]'></div>
            <div className='absolute bottom-0 left-[50%] grid w-[100%] translate-x-[-50%] lg:translate-y-[30%] translate-y-[90%] grid-cols-3 gap-3 lg:gap-5'>
                <img src={BannerImage1} alt='BannerImage1' />
                <img src={BannerImage2} alt='BannerImage2'/>
                <img src={BannerImage3} alt='BannerImage3'/>
            </div>
        </div>
    </section>
    <div className='sm:h-[200px] lg:h-[200px]'></div>

    <section className='bg-richblack-900 border-b border-richblack-700'>
        <div className='w-11/12 max-w-maxContent  pb-3 font-inter  font-semibold text-xl md:text-4xl  text-center text-richblack-100 mx-auto'>
            "We are passionate about revolutionizing the way we learn. Our innovative platform 
            <HighLightText text={"combines technology"}/>, 
            <span className='bg-gradient-to-b from-[#FF512F] to-[#F09819] text-transparent bg-clip-text'>expertise</span>, 
            and community to 
            create an <span className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text'>unparalleled educational experience</span>."
        </div>
    </section>

    <section className='w-11/12 max-w-maxContent mx-auto '>
        <div className=' flex flex-col lg:flex-row justify-between gap-10 items-center '>
         <div className='font-inter lg:w-[50%] gap-10 my-14' >
            <span className='bg-gradient-to-b from-[#833AB4] via-[#FD1D1D] to-[#FCB045] text-transparent bg-clip-text
                             font-semibold text-4xl lg:w-[70%]'>
            Our Founding Story
            </span>
            <div className='font-medium  text-base text-richblack-300 lg:w-[80%] pt-6 w-[90%]'>
              <p className='pb-4'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
              <p>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
            </div>
         </div>
        <div>
            <img src={FoundingStory} alt='FoundingStory' 
            className='shadow-[-5px_-5px_25px_0] shadow-[#FC6767]'/>
        </div>
        </div>
        <div className='flex lg:flex-row flex-col items-center lg:gap-10 justify-between'>
                <div className='my-16 lg:w-[40%] w-[90%]'>
                    <h3 className='bg-gradient-to-b from-[#E65C00] to-[#F9D423] text-transparent bg-clip-text
                                    font-semibold text-4xl'>Our Vision</h3>
                    <p className='text-richblack-300 text-base font-medium pt-4'>With this vision in mind, we set out on a journey to create an e-learning 
                    platform that would revolutionize the way people learn. Our team of 
                    dedicated experts worked tirelessly to develop a robust and intuitive 
                    platform that combines cutting-edge technology with engaging content, 
                    fostering a dynamic and interactive learning experience.</p>
                </div>
                <div className='lg:w-[40%] w-[90%]'>
                    <h3 className=' font-semibold text-4xl'> <HighLightText text={"Our Mission"}/></h3>
                    <p className='text-richblack-300 text-base font-medium pt-4'>Our mission goes beyond just delivering courses online. We wanted to 
                    create a vibrant community of learners, where individuals can connect, 
                    collaborate, and learn from one another. We believe that knowledge thrives
                    in an environment of sharing and dialogue, and we foster this spirit of 
                    collaboration through forums, live sessions, and networking opportunities.</p>
                </div>
            </div>
        </section>
    
    <StatsComponent/>
    <section>
        <div className='w-11/12 bg-richblack-900 max-w-maxContent mt-20 mx-auto'>
        <LearningGrid/>
        <ContactFormSection/>
        </div>
    </section>

    <div className='w-11/12 max-w-maxContent bg-richblack-900 flex flex-col'>
        <h1 className='text-center text-4xl font-semibold mt-8 text-richblack-5'>
           Reviews from other learners  
        </h1>
        {/* ReviewsSlider */}
    </div>

    <Footer/>
    </div>
  )
}

export default About