import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import IconBtn from '../../../../common/IconBtn'

import { resetCourseState, setStep } from "../../../../../slices/courseSlice";
import { COURSE_STATUS } from "../../../../../utils/constants";
import { useNavigate } from "react-router-dom";
import { editCourseDetails } from "../../../../../services/operations/courseDetailsAPI";

// why we need setEditCourse

const PublishCourse = () => {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
  } = useForm();

  const dispatch = useDispatch();
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const goToBack = () => {
    dispatch(setStep(2))
    // dispatch(setEditCourse(true))
  }
  
  // console.log("status before", course?.data?.status)

  useEffect(() => {
    if(course?.data?.status === COURSE_STATUS.PUBLISHED) {
      setValue("publish", true)
    }
            // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  // console.log("status", course?.status)

  const handlePublishChanges = async() => {
      if((course?.data?.status === COURSE_STATUS.PUBLISHED && getValues("publish") === true)
        || (course?.data?.status === COURSE_STATUS.DRAFT && getValues("publish") === false) )
        {  
          // form has not been updated
          // no need to make api call
          dispatch(resetCourseState())
          navigate("/dashboard/my-courses")
          return
        }
      
        const formdata = new FormData()
        formdata.append('courseId', course._id)
        const courseStatus = getValues("publish") ? COURSE_STATUS.PUBLISHED 
        : COURSE_STATUS.DRAFT
        // console.log(courseStatus)
        formdata.append('status', courseStatus)
        setLoading(true)
        const result = await editCourseDetails(formdata, token)
        if(result) {
          dispatch(resetCourseState())
          navigate('/dashboard/my-courses')
        }
        setLoading(false)
  }

  const onSubmit = (data) => {
 
    handlePublishChanges()
  };



  return (
    <div className="bg-richblack-800 border-[1px] font-semibold text-2xl flex flex-col gap-y-4 border-richblack-600 px-6 py-4 rounded-md">
      <p>Publish Settings</p>

      <form onSubmit={handleSubmit(onSubmit)}>
     
        <div className="flex gap-x-3">
        <label className="" htmlFor="public">
          <input type="checkbox" id="publish" {...register("publish")} />
          <span className="text-richblack-400 font-medium text-xl" >  Make this course as public</span>
          </label>
      
        </div>
        <div className="flex gap-x-4 justify-end mt-8">
        <button
          onClick={goToBack}
          className="rounded-md bg-richblack-300 text-black text-base font-medium p-1 px-4"
        >
          Back
        </button>
        <IconBtn text="Save and Publish" disabled={loading}>
       
        </IconBtn>
      </div>

       
      </form>
  
     
    </div>
  );
};

export default PublishCourse;
