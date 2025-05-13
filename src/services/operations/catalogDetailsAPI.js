
import toast from 'react-hot-toast'
import { apiConnector } from '../apiconnector'
import { categories } from '../apis'

const {CATEGORY_PAGE_DETAILS_API} = categories

export const catalogDetailsAPI = async(categoryId) => {
   // console.log("id", categoryId)
   // console.log("typeof", typeof({categoryId:categoryId}))
  let result = []
  const toastId = toast.loading("Loading...")
  try{
     const res = await apiConnector("POST", CATEGORY_PAGE_DETAILS_API, 
     {
      categoryId:categoryId,
   })
     console.log("CATEGORY PAGE DETAILS API...", res)
     if(!res?.data?.success) {
        throw new Error("Could not fetch category page data")
     }
     result = res?.data
     
  }catch(error) {
      console.log("CATEGORY PAGE API ERROR...", error)
      toast.error(error.message)
      result = error.res?.data
  }
  toast.dismiss(toastId)
  return result
}
