import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    step:1,
    course:null,
    editCourse:false,
    paymentLoading:false,
    category:null
}

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers:{
      setStep:(state, action) => {
        state.step = action.payload;
      },
      setCourse: (state, action) => {
        state.course = action.payload;
      },
      setEditCourse: (state, action) => {
        state.editCourse = action.payload;
      },
      setPaymentLoading: (state, action) =>{
        state.paymentLoading = action.payload;
      },
      setCategory: (state,action) => {
         state.category = action.payload
      },
      resetCourseState: (state) => {
        state.step = 1
        state.course = null
        state.editCourse = false
        state.category = null
      },

    },
})

export const {
    setStep,
    setCourse,
    setEditCourse,
    setPaymentLoading,
    resetCourseState,
    setCategory,
} = courseSlice.actions

export default courseSlice.reducer