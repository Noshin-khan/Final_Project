import {toast} from 'react-hot-toast';

import { profileEndpoints } from '../apis'
import { apiConnector } from '../apiconnector';
import { setUser } from '../../slices/profileSlice';
import { logout } from './authAPI';
import { setLoading } from '../../slices/authSlice';

const {
    DELETE_PROFLIE,
    UPDATE_PROFILE,
    UPDATE_DISPLAY_PICTURE,
    UPDATE_PASSWORD_API,
    ENROLLED_COURSE_API,
    GET_USER_DETAILS_API,
} = profileEndpoints;

export function updateDisplayPicture(token, formdata) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
    //    console.log(formdata)
        try{
           const res = await apiConnector("PUT",
            UPDATE_DISPLAY_PICTURE, formdata,
            {
                "Content-Type": "multipart/form-data",
                Authorization:`Bearer ${token}`,
            }
           )
           console.log(
            "UPDATE_DISPLAY_PICTURE API RESPONSE.......",res)
            
            if(!res.data.success) {
                throw new Error(res.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            dispatch(setUser(res.data.data))
        }catch(error) {
            console.log("UPDATE_DISPLAY_PICTURE API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(token, formdata) {
    return async(dispatch) => {
        const toastId = toast.loading("Loading...")
        console.log("newformdata: ",formdata)
        try{
          const res = await apiConnector("PUT", UPDATE_PROFILE, formdata, {
            Authorization: `${token}`,
          })
          console.log("UPDATE_PROFILE API RESPONSE............", res) 
          if(!res.data.success) {
            throw new Error(res.data.message)
          }
          dispatch(
            setUser({...res.data.undatedUserDetails})
          )
          toast.success("Profile Updated Successfully")
        }catch(error) {
           
            console.log("UPDATE_PROFILE API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(token, formdata) {
        const toastId = toast.loading("Loading...")
        console.log("data", formdata)
        try{
            const res = await apiConnector("POST", UPDATE_PASSWORD_API, formdata, {
                Authorization: `Bearer ${token}`,
            })
            console.log("UPDATE_PASSWORD_API API RESPONSE- ", res)
            if(!res.data.success) {
                throw new Error(res.data.message)
            }
            toast.success("Password changed Successfully")
        }catch(error) {
            
            console.log("UPDATE_PASSWORD_API API RESPONSE- ", error)
            toast.error(error.res.data.message)
        }
        toast.dismiss(toastId)
}

export function deleteAccount(token, navigate) {
   return async(dispatch) => {
    const toastId = toast.loading("Loading...")
    try{
        const res = await apiConnector("DELETE", DELETE_PROFLIE, null, {
            Authorization: `Bearer ${token}`,
        })
        console.log("DELETE_PROFLIE API RESPONSE-", res)
        if(!res.data.success) {
            throw new Error(res.data.message)
        }
        toast.success("ACCOUNT DELETED SUCCESSFULLY")
        dispatch(logout(navigate))
    }catch(error) {
        console.log("DELETE_PROFLIE API RESPONSE-", error)
        toast.error(error.res.data.message)
    }
    toast.dismiss(toastId)
   }
}

export function getUserDetails(token, navigate) {
    return async (dispatch) => {
      const toastId = toast.loading("Loading...")
      dispatch(setLoading(true))
      try {
        const response = await apiConnector("GET", GET_USER_DETAILS_API, null, {
          Authorization: `Bearer ${token}`,
        })
        console.log("GET_USER_DETAILS API RESPONSE............", response)
  
        if (!response.data.success) {
          throw new Error(response.data.message)
        }
        const userImage = response.data.data.image
          ? response.data.data.image
          : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
        dispatch(setUser({ ...response.data.data, image: userImage }))
      } catch (error) {
        dispatch(logout(navigate))
        console.log("GET_USER_DETAILS API ERROR............", error)
        toast.error("Could Not Get User Details")
      }
      toast.dismiss(toastId)
      dispatch(setLoading(false))
    }
  }


export async function getUserEnrolledCourses(token) {
    const toastId = toast.loading("Loading...")
    let result = []
       try{
        const res = await apiConnector("GET", ENROLLED_COURSE_API, null, {
            Authorization: `Bearer ${token}`,
        })

         console.log(
      "GET_USER_ENROLLED_COURSES_API API RESPONSE............",
      res
    )

        if(!res.data.success) {
            throw new Error(res.data.message)
        }
        result = res.data.data

       }catch(error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
       }
       toast.dismiss(toastId)
       return result
    }