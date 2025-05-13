import React from "react";
import ContactUsForm from '../ContactUsPage/ContactUsForm'

const ContactFormSection = () => {
  return (
    <div className="w-11/12 max-w-maxContent bg-richblack-900">
      <div className="flex flex-col">
        <div className=" text-center">
          <h3 className="text-richblack-5 font-semibold text-4xl">Get in Touch</h3>
          <p className="text-richblack-300 font-medium text-base mt-2">We’d love to here for you, Please fill out this form.</p>
        </div>
        
           <div className="w-[50%]  mx-auto ">
            <ContactUsForm/>
          </div>
        </div>
    </div>
  );
};

export default ContactFormSection;
