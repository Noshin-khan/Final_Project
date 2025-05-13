import React from "react";

import { Link } from "react-router-dom";

// Images
import Logo from "../../assets/Logo/Logo-Full-Light.png";

// Icons
import { FaGithub, FaGoogle, FaDiscord, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-richblack-800">
      <div className="flex lg:flex-row flex-col gap-8 items-center justify-between w-11/12 max-w-maxContent text-richblack-400 leading-6 mx-auto py-14 lg:border-b-2 border-richblack-400 lg:mb-10">
      {/* Section 1 */}
        <div className="" >
          <img src={Logo} alt="studynotion" className="mb-2"/>
          <p className="mb-2">The Ultimate Guide TO Ace SDE Interviews</p>
          <div className=" flex gap-2 text-xl">
          
        <a href="https://discord.com/"> <FaDiscord /></a>  
        <a href="https://github.com/"> <FaGithub/></a>  
        <a href="https://www.google.com/"> <FaGoogle/></a> 
        <a href="https://www.linkedin.com/feed/"> <FaLinkedin/></a> 
         
          
          
          </div>
      
        </div>

        <div className="flex lg:flex-row flex-col lg:border-l-2  gap-4 border-richblack-500 items-center justify-center lg:w-[30%]" >
        {/* Section 2 */}
        <div className="flex flex-col  lg:gap-7 items-center lg:w-[50%]">
          <h3 className="text-2xl font-semibold leading-6 ">Menu</h3>
          <div className="text-base font-normal leading-8 text-center ">
            {["Login", "About Us", "Catalog", "Contact Us"].map((ele, i) => {
                 return (
                     <div key={i} className="hover:text-richblack-200">
                          <Link to={ele.toLowerCase()}>{ele}</Link>
                     </div>
                 );
            })}
          </div>
        </div>
        {/* Section 3 */}
        <div className="flex flex-col lg:gap-7 items-center justify-center lg:w-[50%]">
          <h3 className="text-2xl font-semibold leading-6">Services</h3>
          <div className="text-base font-normal leading-8 text-center">
            {["Privacy Policy", "Terms of Use", "Refund & Cancellation Policy"].map((ele, i) => {
              return (
                <div key={i} className="hover:text-richblack-200">
                     <Link to={ele.split(" ").join("-").toLowerCase()}>
                      {ele}
                     </Link>
                </div>
              )
            })}
          </div>
        </div>
        </div>
       
        {/* Section 4 */}
        <div className="">
          <h3 className="text-xl font-semibold leading-6 flex flex-col items-center">GET IN TOUCH</h3>
          <p className="text-base font-normal leading-8 text-center ">Email: support@studynotion.in</p>
        </div>
      </div>
      <div className="text-center text-richblack-400 font-bold">
        <p className="">Made with <span className="text-pink-500">♥</span> Shruti Kamboj © 2023 Studynotion</p>
      </div>
    </div>
  );
};

export default Footer;