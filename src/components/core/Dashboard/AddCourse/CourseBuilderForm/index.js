import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import IconBtn from '../../../../common/IconBtn'
import { IoAddCircleOutline } from "react-icons/io5"
import { useDispatch, useSelector } from 'react-redux'
import { MdNavigateNext } from "react-icons/md"
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice'
import NestedView from './NestedView'
import toast from 'react-hot-toast'
import { createSection, updateSection } from '../../../../../services/operations/courseDetailsAPI'

const CourseBuilderForm = () => {

  const {
    register,
    setValue,
    formState:{errors},
    handleSubmit,
    
} = useForm()

const [editSectionName, setEditSectionName] = useState(false)
const {course} = useSelector((state) => state.course)
const dispatch = useDispatch()
const [loading, setLoading] = useState(false)
const {token} = useSelector((state) => state.auth) 



const cancelEdit = () => {
  setEditSectionName(false);
  setValue("sectionName", "")
}

const goToBack = () => {
  dispatch(setStep(1))
  dispatch(setEditCourse(true))
}



// console.log("course2",course.data.courseContent)

const goToNext = () => {
  // bina section ke next step par jaake fayda nhi
  if(course.courseContent.length === 0) {
    toast.error("Please add atleast one section")
    return;
  }
  if(course.courseContent.some((section) => section.subSection.length === 0)) {
    toast.error("Please add atleast one lecture in each section")
    return;
  }
  // if everything good
  dispatch(setStep(3))
}

const handleChangeEditSectionName = (sectionId, sectionName) => {
  if(editSectionName === sectionId) {
    cancelEdit()
    return
  }

  setEditSectionName(sectionId)
  setValue("sectionName", sectionName)
}

const onSubmit = async(data) => {
    setLoading(true)
    let result;

    if(editSectionName) {
       result = await updateSection(
        {
          sectionName: data.sectionName,
          sectionId: editSectionName,
          courseId: course._id,
        }, token
       )
    }
    else{
       result = await createSection (
        {
          sectionName: data.sectionName,
          courseId: course._id,
        },token
       )
    }
    //update result
    if(result) {
      dispatch(setCourse(result))
      setEditSectionName(false)
      setValue("sectionName", "")
    }
    //loading false
    setLoading(false)
}
console.log("course",course.courseContent)
  return (
    <div className='bg-richblack-800 border-[1px] border-richblack-600 rounded-md p-2 px-4'>
      <p> Course Builder</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex flex-col'>
          <label className='label-style'>Section Name<sup className='text-pink-200 text-[14px]'>*</sup></label>
          <input type='text'
            placeholder='Add a section to build your course'
            className='form-style'
            name='sectionName'
            id='sectionName'
            {...register('sectionName', {required:true})}
          />
          {errors.sectionName && (
            <span className='text-pink-200 text-sm'>Section name is required</span>
          )}
        </div>
        <div className='mt-3 flex gap-x-2'>
          <IconBtn type="submit"
          disabled={loading}
          text={editSectionName ? "Edit Section Name" : "Create Section"}
          outline={true}>
           <IoAddCircleOutline className='text-yellow-50'/>  
          </IconBtn>
          {editSectionName && (
            <button 
            type='button'
            onClick={cancelEdit}
            className='text-sm underline text-richblack-300 mt-6 font-medium'>
              Cancel Edit
            </button>
          )}
        </div>
      </form>
      {console.log("length",course.courseContent.length )}
      {course.courseContent.length > 0 && (
        <NestedView handleChangeEditSectionName={handleChangeEditSectionName} />
      )}

      <div className='flex gap-x-4 justify-end'>
      <button onClick={goToBack}
      className='rounded-md bg-richblack-300 text-black text-base font-medium p-1 px-4'>
        Back
      </button>
      <IconBtn text="Next" onclick={goToNext}>
         <MdNavigateNext className='text-black'/>
      </IconBtn>

      </div>

    </div>
  )
}

export default CourseBuilderForm