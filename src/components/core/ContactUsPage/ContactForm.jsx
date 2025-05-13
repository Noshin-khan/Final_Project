import React from 'react'
import * as Icon1 from "react-icons/ai";
import * as Icon2 from "react-icons/bi";
import * as Icon3 from "react-icons/md";
import ContactUsForm from './ContactUsForm';

const contactDetails = [
    {
       icon: "AiFillMessage",
       heading: "Chat on Us",
       description: "Our friendly team is here to help.",
       contact: "info@studynotion.com"
    },
    {
        icon: "BiWorld",
        heading: "Visit Us",
        description:"Come and say hello at our office HQ.",
        contact:"Laxmi Nagar, Ujjain"
    },
    {
        icon:"MdCall",
        heading: "Call Us",
        description:"Mon - Fri From 8am to 5pm",
        contact:"+123 456 7869" 
    } 
]

const ContactForm = () => {
    
  return (
    <div className='flex sm:flex-col lg:flex-row gap-16 mt-10'>
    {/* contactUs details */}
        <div className='text-richblack-300 flex flex-col gap-5 lg:w-[40%] h-[50%] bg-richblack-800 rounded-xl lg:p-6 p-8'>
        {
            contactDetails.map((ele, index) => {
                let Icon = Icon1[ele.icon] ||Icon2[ele.icon] || Icon3[ele.icon]
                return (
                   <div key={index} className='flex flex-col'>
                       <div className='flex flex-row items-center gap-3'>
                        <Icon size={25}/>
                        <h1 className='text-lg font-semibold text-richblack-5'>{ele?.heading}</h1>
                       </div>
                       <div>
                        <p className='font-medium'>{ele?.description}</p>
                        <p className='font-semibold'>{ele?.contact}</p>
                       </div>
                   </div> 
                )
            })
        }
          
        </div>

        {/* contactform */}
        <div className='lg:w-[60%] border border-richblack-300  p-7 lg:p-14 rounded-xl'>
            <div className='text-richblack-300 '>
                <h1 className='text-4xl leading-10 font-semibold text-white'>Got a Idea? We've got the skills. Let's team up</h1>
                <p className='mb-4'>Tell us more about yourself and what you're got in mind.</p>

                <ContactUsForm/>
            </div>
        </div>
    </div>
  )
}

export default ContactForm