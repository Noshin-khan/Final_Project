import React from "react";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";

import CourseBuilderForm from "./CourseBuilderForm/index";
import CourseInfomationForm from "./CourseInformationForm/index";
import PublishCourse from "./PublishCourse/index";

const RenderSteps = () => {
  const { step } = useSelector((state) => state.course);

  const steps = [
    {
      id: 1,
      title: "Course Information",
    },
    {
      id: 2,
      title: "Course Builder",
    },
    {
      id: 3,
      title: "Publish Course",
    },
  ];

  return (
    <div>
      <div className="text-white relative flex mb-2 mt-6 justify-center w-full">
        {steps.map((item,i) => (
          <>
            <div className="" key={i}>
              <button
                className={`rounded-full mb-1 px-3 py-1 ${
                  step === item.id
                    ? "text-yellow-50 bg-yellow-900  border-[1px] border-yellow-50"
                    : " text-richblack-700 border-[1px] border-richblack-700 bg-richblack-800"
                     } ${step > item.id && "bg-yellow-50 text-yellow-50"}}`}
              >
              
                {step > item.id ? <FaCheck  className="font-bold text-richblack-900"/> : item.id}
              </button>
              </div>

              {item.id !== steps.length && 
              ( 
              <div className={`w-[33%] border-dashed border-b-2 h-[20px]
              ${step > item.id ? ("text-yellow-50") : ( "text-richblack-500")}`}>
              </div>
              )}
           
          </>
        ))}
       
      </div>
      <div className="flex relative mb-16 select-none w-full ">
        {steps.map((item,i) => (
          <div className="flex min-w-[155px] flex-col items-center" key={i}>
            <p
              className={`text-sm font-normal  ${
                step >= item.id  ? "text-white" : "text-richblack-500"
              } `}
            >
              {item.title}
            </p>
          </div>
        ))}
      </div>

     
      {step === 1 && <CourseInfomationForm/>}
      {step ===2 && <CourseBuilderForm/>}
      {step === 3 && <PublishCourse/>}
    </div>
  );
};

export default RenderSteps;
