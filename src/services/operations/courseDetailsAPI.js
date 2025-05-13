import { toast } from "react-hot-toast"

// import {paymentLoading} from "../../slices/courseSlice"
import { apiConnector } from "../apiconnector"
import { courseEndpoints } from "../apis"

const {
  COURSE_CATEGORIES_API,
  CREATE_COURSE_API,
  UPDATE_SECTION_API,
  CREATE_SECTION_API,
  DELETE_SECTION_API,
  DELETE_SUBSECTION_API,
  CREATE_SUBSECTION_API,
  UPDATE_SUBSECTION_API,
  EDIT_COURSE_API,
  GET_ALL_COURSE_API,
  DELETE_COURSE_API,
  COURSE_DETAILS_API,
  FETCH_INSTRUCTOR_COURSE,
} = courseEndpoints


// fetching the available course categories
// console.log("heelo")
export const fetchCourseCategories = async () => {
  const toastId = toast.loading("Loading...")
    let result = []
      try{
        const res = await apiConnector("GET", COURSE_CATEGORIES_API)
        console.log("COURSE_CATEGORIES_API API RESPONSE............", res)
    
        // console.log("result", res?.data?.data)
        if(!res?.data?.success) {
         throw new Error("Could Not Fetch Course Categories")
         }
         toast.dismiss(toastId)
        result = res?.data?.data
     
 
      }catch(error) {
        console.log("COURSE_CATEGORY_API API ERROR............", error)
        toast.error(error.message)
      }
      return result
}

// add the course details
export const addCourseDetails = async(data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("POST", CREATE_COURSE_API, data, {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE COURSE API RESPONSE......", res)
        if(!res?.data?.success) {
            throw new Error("Could Not Add Course Details")
        }
        toast.success("Course Details Added Successfully")
        result = res?.data?.data
    }catch(error) {
        console.log("CREATE COURSE API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const fetchInstructorCourse = async(token) => {
  let result = []
  const toastId = toast.loading("Loading...")
  try{
        const res = await apiConnector("GET", FETCH_INSTRUCTOR_COURSE,null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("FETCH_INSTRUCTOR_COURSE API RESPONSE............", res)
        if(!res?.data?.success) {
          throw new Error("Could not Fetch Instructor Course" )
        }
        toast.dismiss(toastId)
        result = res?.data?.data
  } catch(error) {
    console.log(" FETCH_INSTRUCTOR_COURSEAPI ERROR............", error)
    toast.error(error.message)
  }
  return result
}

export const createSection = async(data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
    const res = await apiConnector("POST", CREATE_SECTION_API, data, {
     
      Authorization: `Bearer ${token}`,
  })
  console.log("CREATE SSECTION API RESPONSE......", res)
  if(!res?.data?.success) {
      throw new Error("Could Not Add Section Details")
  }
  toast.success("Section created")
  result = res?.data?.updatedCourse
 
}catch(error) {
  console.log("CREATE SECTION API ERROR............", error)
  toast.error(error.message)
}
toast.dismiss(toastId)
return result
}

export const updateSection = async(data,token) => {
      let result = null
      const toastId = toast.loading("Loading...")
      try{
         const res = await apiConnector("PUT", UPDATE_SECTION_API, data, {
          Authorization: `Bearer ${token}`,
         })
         console.log("UPDATE SECTION API RESPONSE............", res)
         if (!res?.data?.success) {
          throw new Error("Could Not Update Section")
        }
        toast.success("Course Section Updated")
        result = res?.data?.data
      }catch(error) {
        console.log("UPDATE SECTION API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
}

export const deleteSection = async(data,token) => {
    let result = null
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("POST", DELETE_SECTION_API, data, {
          Authorization: `Bearer ${token}`,
        })
        console.log("DELETE SECTION API RESPONSE............", res)
        if(!res?.data?.success) {
          throw new Error("Could Not Delete Section")
        }
        toast.success("Course Section Deleted")
        result = res?.data?.data
    }catch(error) {
      console.log("DELETE SECTION API ERROR............", error)
      toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}

export const createSubSection = async(data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
    const res = await apiConnector("POST", CREATE_SUBSECTION_API, data, {
     
      Authorization: `Bearer ${token}`,
  })
  console.log("CREATE SUB-SECTION API RESPONSE......", res)
  if(!res?.data?.success) {
      throw new Error("Could Not Add Lecture Details")
  }
  toast.success("Lecture created")
  result = res?.data?.data
 
}catch(error) {
  console.log("CREATE SUB-SECTION API ERROR............", error)
  toast.error(error.message)
}
toast.dismiss(toastId)
return result
}

export const updateSubSection = async(data,token) => {
      let result = null
      console.log("data", data) 
      const toastId = toast.loading("Loading...")
      try{
        // console.log("hello")
        // console.log("data is", data)
        // console.log("token is", token)
         const res = await apiConnector("POST", UPDATE_SUBSECTION_API, data, {
          Authorization: `Bearer ${token}`,
         })
        
         console.log("UPDATE SUB-SECTION API RESPONSE............", res)
         if (!res?.data?.success) {
          throw new Error("Could Not Update Lecture")
        }
        toast.success("Lecture Updated")
        result = res?.data?.data
      }catch(error) {
        console.log("UPDATE SUB-SECTION API ERROR............", error)
        toast.error(error.message)
      }
      toast.dismiss(toastId)
      return result
}

export const deleteSubSection = async(data,token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
      const res = await apiConnector("POST", DELETE_SUBSECTION_API,data, {
        Authorization: `Bearer ${token}`,
      })
      console.log("DELETE SUB-SECTION API RESPONSE............", res)
      if(!res?.data?.success) {
        throw new Error("Could Not Delete lecture")
      }
      toast.success("Lecture Deleted")
      result = res?.data?.data
  }catch(error) {
    console.log("DELETE SUB-SECTION API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result
}

export const editCourseDetails = async(data, token) => {
  let result = null
  const toastId = toast.loading("Loading...")
  try{
      const res = await apiConnector("PUT", EDIT_COURSE_API, data, {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      })
      console.log("EDIT COURSE API RESPONSE............", res)
      if(!res?.data?.success) {
        throw new Error("Could Not EDIT COURSE")
      }
      toast.success("Course Edited")
      result = res?.data?.data
  }catch(error) {
    console.log("EDIT COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
  return result

}

export const getAllCourses = async() => {
    let result = []

    try{
      const res = await apiConnector("GET", GET_ALL_COURSE_API)
      console.log("GET_ALL_COURSE_API API RESPONSE............", res)
  
      if(!res?.data?.success) {
       throw new Error("Could Not Fetch Course details")
       }
      result = res?.data?.data
   

    }catch(error) {
      console.log("GET_ALL_COURSE_API API ERROR............", error)
      toast.error(error.message)
    }
    return result

}

// delete a course
export const deleteCourse = async (data, token) => {
  const toastId = toast.loading("Loading...")
  try {
    const response = await apiConnector("DELETE", DELETE_COURSE_API, data, {
      Authorization: `Bearer ${token}`,
    })
    console.log("DELETE COURSE API RESPONSE............", response)
    if (!response?.data?.success) {
      throw new Error("Could Not Delete Course")
    }
    toast.success("Course Deleted")
  } catch (error) {
    console.log("DELETE COURSE API ERROR............", error)
    toast.error(error.message)
  }
  toast.dismiss(toastId)
}

//specific course details
export const fetchCourseDetails = async(courseId, token) => {
  // console.log("data is",courseId)
  // console.log("token is",token)
  
  const toastId = toast.loading("Loading...")
  //   dispatch(setLoading(true));
  let result = null
  try {
    const response = await apiConnector("POST", COURSE_DETAILS_API,
    { courseId},
    {
      Authorization: `Bearer ${token}`
    }
   )
   
    console.log("COURSE_DETAILS_API API RESPONSE............", response)

    if (!response.data.success) {
      throw new Error(response.data.message)
    }
    result = response.data
    // console.log("result", result)
  } catch (error) {
    console.log("COURSE_DETAILS_API API ERROR............", error)
    result = error.response.data
    // console.log("result", result)
    // toast.error(error.response.data.message);
  }
  toast.dismiss(toastId)
  //   dispatch(setLoading(false));
  return result
}



