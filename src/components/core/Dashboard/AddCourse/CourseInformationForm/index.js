import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineCurrencyRupee } from "react-icons/hi";
import { MdNavigateNext } from "react-icons/md";
import IconBtn from "../../../../common/IconBtn";
import { COURSE_STATUS } from "../../../../../utils/constants";

import TagsInput from "./TagsInput";
import Upload from "../Upload";
import RequirementField from "./RequirementField";
import {
  addCourseDetails,
  editCourseDetails,
  
} from "../../../../../services/operations/courseDetailsAPI";
import { setCourse, setStep } from "../../../../../slices/courseSlice";
import toast from "react-hot-toast";

const CourseInfomationForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { course, editCourse, category } = useSelector((state) => state.course);
  const [loading, setLoading] = useState(false);

  // console.log("categ", category)

  useEffect(() => {


    if (editCourse) {
      // console.log("course is", course)
      // console.log("category", course.data.category._id)
      
      setValue("courseName", course.data.courseName);
      setValue("courseDescription", course.data.courseDescription);
      setValue("price", course.data.price);
      setValue("tag", course?.data.tag);
      setValue("whatYouWillLearn", course?.data?.whatYouWillLearn);
      setValue("category", course?.data?.category?._id);
      setValue("instructions", course?.data?.instructions);
      setValue("thumbnail", course?.data?.thumbnail);
    }
    // getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isFormUpdated = () => {
    const currentValues = getValues();
    console.log("changes after editing form values:", currentValues);
    console.log("currentValw",currentValues.instructions)
    console.log("course",course.data.instructions)
    if (
      currentValues.courseName !== course.data.courseName ||
      currentValues.courseDescription !== course.data.courseDescription ||
      currentValues.price !== course.data.price ||
      currentValues.tag !== course.data.tag ||
      currentValues.whatYouWillLearn !== course.data.whatYouWillLearn ||
      currentValues.category !== course.data.category._id ||
      currentValues.instructions !== course.data.instructions ||
      currentValues.thumbnail !== course.data.thumbnail
    ) {
      return true
    }
    return false
  }
  // console.log("bool", isFormUpdated())

  //   handle next button click
  const onSubmit = async (data) => {
    // console.log("data",data);
    if (editCourse) {
      if (isFormUpdated()) {
        // console.log("inside this")
        const currentValues = getValues();
        // console.log("currentValues",currentValues)
       
        const formData = new FormData();
        //console.log(data)
        formData.append("courseId", course?.data?._id);
        // console.log(data.thumbnail)
        // console.log("course", course.data.category._id)
        if (currentValues.courseName !== course.courseName) {
          formData.append("courseName", data.courseName);
        }
        if (currentValues.courseDescription !== course.courseDescription) {
          formData.append("courseDescription", data.courseDescription);
        }
        if (currentValues.price !== course.price) {
          formData.append("price", data.price);
        }
        if (currentValues.tag !== course.tag) {
          formData.append("tag", data.tag);
        }
        if (currentValues.whatYouWillLearn !== course.whatYouWillLearn) {
          formData.append("whatYouWillLearn", data.whatYouWillLearn);
        }
        if (currentValues.category._id !== course.data.category._id) {
          formData.append("category", data.category);
        }
        if (currentValues.instructions !== course.instructions) {
          formData.append("instructions", data.instructions);
        }
        if (currentValues.thumbnail !== course.thumbnail) {
          formData.append("thumbnailImage", data.thumbnail);
        }
        // console.log("id", course?.data?._id)
        setLoading(true);
        const result = await editCourseDetails(formData, token);
        // console.log("result", result)
        setLoading(false);
        if (result) dispatch(setStep(2));
        dispatch(setCourse(result));
      } 
      else {
        toast.error("No changes made to the form");
      }
      return
    }
    else{
      const formData = new FormData();
      formData.append("courseName", data.courseName);
      formData.append("courseDescription", data.courseDescription);
      formData.append("price", data.price);
      formData.append("tag", data.tag);
      formData.append("whatYouWillLearn", data.whatYouWillLearn);
      formData.append("category", data.category);
      formData.append("status", COURSE_STATUS.DRAFT);
      formData.append("instructions", data.instructions);
      formData.append("thumbnailImage", data.thumbnail);
      
      setLoading(true);
      
      const result = await addCourseDetails(formData, token);
      if (result) {
        dispatch(setStep(2));
        dispatch(setCourse(result));
      }
      setLoading(false);
    }
  };

  return (
    <div className="bg-richblue-800 border-[1px]   border-richblack-600 rounded-md">
      <form
        className="px-7 mt-4 flex flex-col gap-y-4 mb-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Course Title */}
        <div className="flex flex-col gap-x-2">
          <label className="label-style" htmlFor="courseName">
            Course Title <sup className="text-pink-200 tezt-[14px]">*</sup>
          </label>
          <input
            className="form-style"
            placeholder="Enter Course Title"
            id="courseName"
            name="courseName"
            {...register("courseName", { required: true })}
          />
          {errors.courseName && (
            <span className="ml-2 text-xs text-pink-200">
              Course Title is required
            </span>
          )}
        </div>

        {/*course description  */}
        <div className="flex flex-col gap-x-2">
          <label className="label-style" htmlFor="courseDescription">
            Course Short Description{" "}
            <sup className="text-pink-200 text-[14px]">*</sup>
          </label>
          <textarea
            className="form-style"
            placeholder="Enter Description"
            cols={40}
            rows={4}
            id="courseDescription"
            name="courseDescription"
            {...register("courseDescription", { required: true })}
          />
          {errors.courseDescription && (
            <span className="ml-2 text-xs text-pink-200">
              Course Description is required
            </span>
          )}
        </div>
        {/* course price */}
        <div className="flex flex-col gap-x-2">
          <label className="label-style" htmlFor="price">
            Price <sup className="text-pink-200 tezt-[14px]">*</sup>
          </label>
          <div className="relative">
            <HiOutlineCurrencyRupee
              className="absolute top-3  ml-2 text-richblack-300 text-base"
              size={20}
            />
            <input
              className="form-style w-full pl-10"
              placeholder="Enter Price"
              id="price"
              name="price"
              {...register("price", { required: true })}
            />
          </div>
          {errors.price && (
            <span className="ml-2 text-xs text-pink-200">
              Course Price is required
            </span>
          )}
        </div>
        {/* Course Category */}
        <div className="flex flex-col gap-x-2">
          <label className="label-style" htmlFor="category">
            Category <sup className="text-pink-200 tezt-[14px]">*</sup>
          </label>
          <select
            className="form-style text-richblack-400"
            id="courseName"
            name="category"
            defaultValue=""
            {...register("category", { required: true })}
          >
            <option value="" disabled>
              Choose a Category
            </option>
            {!loading &&
              category?.map((ele, indx) => (
                <option key={indx} value={ele?._id}>
                  {ele?.name}
                </option>
              ))}
          </select>
          {errors.category && (
            <span className="ml-2 text-xs text-pink-200">
              Course category is required
            </span>
          )}
        </div>

        {/* Tags */}
        <TagsInput
          label="Tags"
          name="tag"
          placeholder="Enter tags and press enter"
          register={register}
          errors={errors}
          setValue={setValue}
          getValues={getValues}
        />

        {/* Upload thumbnail */}
        <Upload
          name="thumbnail"
          label="Course Thumbnail"
          register={register}
          errors={errors}
          setValue={setValue}
          editData={editCourse ? course?.data?.thumbnail : null}
        />

        {/* Benefits of course */}
        <div className="flex flex-col gap-x-2">
          <label className="label-style" htmlFor="whatYouWillLearn">
            Benefits of the course{" "}
            <sup className="text-pink-200 tezt-[14px]">*</sup>
          </label>
          <textarea
            className="form-style"
            placeholder="Enter Benefits of the course"
            cols={40}
            rows={4}
            id="whatYouWillLearn"
            name="whatYouWillLearn"
            {...register("whatYouWillLearn", { required: true })}
          />
          {errors.whatYouWillLearn && (
            <span className="ml-2 text-xs text-pink-200">
              Benefits of the course is required
            </span>
          )}
        </div>

        {/* Reqirements/Instruction */}
        <RequirementField
          name="instructions"
          label="Requirements/Instructions"
          placeholder="Enter benefits of the course"
          value="instruction"
          register={register}
          errors={errors}
          setValue={setValue}
        />

        {/* Next button */}
        <div className="flex justify-end mr-8 mb-4">
          {editCourse && (
            <button
              onClick={() => dispatch(setStep(2))}
              disabled={loading}
              className="flex cursor-pointer text-base px-1 items-center mr-3 gap-x-2 rounded-md bg-richblack-300 xl:py-[8px] xl:px-[20px] xl:font-semibold font-medium text-richblack-900"
            >
              Continue Without Saving
            </button>
          )}
          <IconBtn
            disabled={loading}
           
            text={!editCourse ? "Next" : "Save Changes"}
          >
            <MdNavigateNext />
          </IconBtn>
        </div>
      </form>
    </div>
  );
};

export default CourseInfomationForm;
