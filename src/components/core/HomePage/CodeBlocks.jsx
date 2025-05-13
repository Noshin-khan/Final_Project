import React from 'react'
import {FiArrowRight} from 'react-icons/fi';
import CTAButton from "../HomePage/Button"
import { TypeAnimation } from 'react-type-animation'


const CodeBlocks = ({
    position, heading, subheading,ctabtn1,ctabtn2,codeblock,codeColor,backgroundGradient,
}) => {
  return (
    <div className={`flex ${position} justify-between flex-col lg:gap-10 gap-10 my-20`}>
    {/* section 1 */}
    <div className='w-[100%] lg:w-[50%] flex flex-col gap-2' >
       {heading}
        
       <div className='text-richblack-300 text-base font-semibold w-[85%] -mt-2'>
            {subheading}
        </div>

        <div className='flex gap-6 mt-7'>
            <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className='flex gap-2 items-center' >
                {ctabtn1.btnText}
                <FiArrowRight/>
            </div>
            </CTAButton>
            <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                       {ctabtn2.btnText}
            </CTAButton>
        </div>
    </div>

    {/* section 2 */}
    <div className='h-fit code-border flex flex-row text-[10px] sm:text-sm leading-[18px] sm:leading-6  w-100% py-4 bg-richblack-800 lg:w-[470px] relative'>
    {backgroundGradient}
    <div className='text-center flex flex-col w-[10%] select-none font-inter font-bold text-richblack-400'>
        <p>1</p>
        <p>2</p>
        <p>3</p>
        <p>4</p>
        <p>5</p>
        <p>6</p>
        <p>7</p>
        <p>8</p>
        <p>9</p>
        <p>10</p>
        <p>11</p>
    </div>
    <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-1`}>

        <TypeAnimation
            sequence={[codeblock,2000,""]}
            repeat={Infinity}
            cursor={true}

            style={{
                whiteSpace: "pre-line",
                    display:"block",
            }}
            omitDeletionAnimation={true}
        />
    </div>
    </div>
    </div>
  )
}

export default CodeBlocks