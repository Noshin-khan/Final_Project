import React, { useEffect, useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { useSelector } from "react-redux";

const TagsInput = ({ label, name, placeholder, errors, register,setValue }) => {

  const {editCourse, course} = useSelector((state) => state.course)

  const [tags, setTags] = useState([]);

  useEffect(() => {
    if(editCourse) {
      // console.log("course in tag componenet",course)
    
      setTags(course?.data?.tag)
    }
    register(name, {required:true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])
  
  useEffect(() => {
    setValue(name, tags)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tags])
  
  function handleKeyDown(e) {
    // if user did not press enter key, return
    if(e.key === 'Enter' || e.key === "," ) {
      e.preventDefault()
      //get the value of the input
      const value = e.target.value
      //if the value is empty, return
      if(!value.trim()) return
      if (value && !tags.includes(value)) {
      //Add the value to the tags array
      setTags([...tags, value])
      //clear the input
      e.target.value=""
      }
    }
   
  }

  function removeTag(i) {
    setTags(tags.filter((ele, index) => index !== i))
  }


  return (
    <div className="flex flex-col">
      <label className="label-style">{label} <span className="text-pink-200 text-xs">*</span></label>
      {tags.map((tag, i) => {
        return (
          <div key={i} className="flex gap-x-2 rounded-xl mb-2 px-2 items-center py-0.5 text-sm bg-yellow-100 w-fit">
            <span className="text-richblack-800 font-semibold"> {tag} </span>
            <span className="text-richblack-800 cursor-pointer">
            <IoCloseCircle onClick={()=> removeTag(i)}/>
            </span>
          </div>
        );
      })}
      <input
        id={name}
        name={name}
        placeholder={placeholder}
        className="form-style"
        onKeyDown={handleKeyDown}
        
       
      />
      
      {
        errors[name] && (
          <span className="ml-2 text-xs tracking-wide text-pink-200">
          {label} is required
        </span>
        )
      }
    </div>
  );
};

export default TagsInput;
