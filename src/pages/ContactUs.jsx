import React from 'react'

import Footer from '../components/common/Footer'
import ContactForm from '../components/core/ContactUsPage/ContactForm'

const ContactUs = () => {
  return (
    <div className='mx-auto mt-20 flex flex-col w-11/12 max-w-maxContent justify-between gap-10 '>
    {/* Contact Form */}
      <div>
        <ContactForm/>
      </div>
      {/* Review Slider */}
      <div>
        <h1>Reviews from other learners</h1>
      </div>

      <Footer/>
    </div>
  )
}

export default ContactUs
