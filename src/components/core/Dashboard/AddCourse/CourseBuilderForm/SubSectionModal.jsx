import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ImCross } from "react-icons/im";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { createSubSection, updateSubSection } from '../../../../../services/operations/courseDetailsAPI';
import { setCourse } from '../../../../../slices/courseSlice';
import Upload from '../Upload';
import IconBtn from '../../../../common/IconBtn';

// TODO -> add border bottom
const SubSectionModal = ({
    modalData,
    setModalData,
    add = false,
    view = false,
    edit = false,
}) => {
      
    const {
         register,
         setValue,
         handleSubmit,
         formState: {errors},
         getValues
    } = useForm()

    // console.log("view", view)
    // console.log("edit", edit)
    // console.log("add", add)

    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
   
    const {token} = useSelector((state) => state.auth)
    const { course } = useSelector((state) => state.course);

    useEffect(()=> {
        if(view || edit) {
            //  console.log("modalData", modalData)
            setValue("lectureTitle", modalData.title);
            setValue("lectureDesc", modalData.description);
            setValue("lectureVideo", modalData.videoUrl);
        }
                // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    const isFormUpdated = () => {
        const currentValues = getValues();
        if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl) {
                return true;
            }
        else{
            return false;
        }
    }
    
    // handle the editing of subsection
    const handleEditSubSection = async() => {
          const currentValues = getValues()
         
          console.log("changes after editing form values:", currentValues)
          const formData = new FormData()
          
          console.log("formData before",formData)
          formData.append("sectionId", modalData.sectionId)
          formData.append("subSectionId", modalData._id)
          console.log("Values After Editing form values:", currentValues)
          console.log("formData",formData)

          if(currentValues.lectureTitle !== modalData.title) {
            formData.append("title", currentValues.lectureTitle)
          }
          if(currentValues.lectureDesc !== modalData.description) {
            formData.append("description", currentValues.lectureDesc)
          }
          if(currentValues.lectureVideo !== modalData.videoUrl) {
            formData.append("video", currentValues.lectureVideo)
          }

          setLoading(true)
          //API call
          const result = await updateSubSection(formData, token)
         
          // update the structure of course
          if (result) {
            // console.log("result", result)
            // update the structure of course
            const updatedCourseContent = course.courseContent.map((section) =>
              section._id === modalData.sectionId ? result : section
            )
            const updatedCourse = { ...course, courseContent: updatedCourseContent }
            dispatch(setCourse(updatedCourse))
          }
          setModalData(null)
          setLoading(false)
    }

    const onSubmit = async(data) => {
        console.log("data",data)
        if(view) return;
        if(edit) {
            if(!isFormUpdated()) {
                toast.error("No changes made to the form")
            }
            else{
                //edit kardo store me
                handleEditSubSection();
            }
            return;
        }

        //ADD
        const formData = new FormData();
        formData.append("sectionId", modalData)
        formData.append("title", data.lectureTitle)
        formData.append("description", data.lectureDesc)
        formData.append("video", data.lectureVideo)
        setLoading(true)
        //API call
        const result = await createSubSection(formData, token)
        if(result) {
          // update the structure of course
          const updatedCourseContent = course.courseContent.map((section) =>
          section._id === modalData ? result : section
    )
           const updatedCourse = { ...course, courseContent: updatedCourseContent }
           dispatch(setCourse(updatedCourse))
        }
        setModalData(null);
        setLoading(false)
    }

  return (
   <div className='fixed inset-0 z-[1000] !mt-0 grid place-items-center w-screen h-screen overflow-auto bg-opacity-10 backdrop-blur-sm'>
     <div className='w-11/12 max-w-[700px] my-10 rounded-md border-[1px] border-richblack-400 bg-richblack-800 '>
       <div className='flex justify-between items-center rounded-md  text-white bg-richblack-700 p-2 px-4'>
        <p className='font-semibold text-lg'>{view && "Viewing"} {edit && "Editing"} {add && "Adding"} Lecture </p>
        <ImCross size={20} onClick={()=> (!loading ? setModalData(null) : {})} className='cursor-pointer'/>
       </div>

       <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full px-6 py-10 gap-y-6'>
       
        {/* <Upload/> */}
        <Upload
            name="lectureVideo"
            label="Lecture Video"
            errors={errors}
            register={register}
            setValue={setValue}
            video={true}
            editData={edit ? modalData.videoUrl : null}
            viewData={view ? modalData.videoUrl : null}
        />

        {/* Lecture title */}
       <div className='flex flex-col '>
       <label className='label-style'> Lecture Title <sup className='text-pink-200 text-xs'>*</sup></label>
       <input 
        id='lectureTitle'
        disabled={view || loading}
        type='text'
        placeholder='Enter Lecture Title'
        className='form-style'
        {...register("lectureTitle", {required:true})}
       />
       {errors.lectureTitle && (
        <span className='text-pink-200 text-sm'>Lecture title is requried</span>
       )}
       </div>
       {/* Lecture Description */}
       <div className='flex flex-col '>
       <label className='label-style'> Lecture Description <sup className='text-pink-200 text-xs'>*</sup></label>
       <textarea 
        id='lectureDesc'
        disabled={view || loading}
        placeholder='Enter Lecture Description'
        className='form-style resize-x-none min-h-[130px] '
        {...register("lectureDesc", {required:true})}
       />
       {errors.lectureDesc && (
        <span className='text-pink-200 text-sm'>Lecture Description is requried</span>
       )}
       </div>
       <div className='flex justify-end'>
       {edit && <IconBtn text="Save Changes"/>}
       {add && <IconBtn text="Save"/>} 
       </div>
      </form>
     
    </div>
   </div>
  )
}

export default SubSectionModal
