import React, { useState,useEffect } from 'react'
import { useSelector } from 'react-redux';

const RequirementField = ({label, name, value,placeholder, errors, register,setValue}) => {

  const[fields, setField] = useState("");
  const [requirement, setRequirements] = useState([])
  const {course,editCourse} = useSelector((state) => state.course)

  
  useEffect(() => {
    if (editCourse) {
      setRequirements(course?.data?.instructions)
    }
    register(name, { required: true, validate: (value) => value.length > 0 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setValue(name, requirement)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirement])

  const handleAddFields = () => {
      if(fields)
      setRequirements([...requirement, fields])
      setField("")
  }


  const removeField = (i) => {
      const updatedRequirements = [...requirement]
      updatedRequirements.splice(i,1)
      setRequirements(updatedRequirements)
    }
    
  
  return (
    <div className=''>
       <label className='label-style'>{label} <span className="text-pink-200 text-xs">*</span></label>
     
       <input 
       className='form-style w-full'
       name={name}
       value={fields}
       placeholder={placeholder}
       onChange={(e) => setField(e.target.value)}

       />
       <span className='text-yellow-100 text-base' onClick={handleAddFields}>Add</span>
       {requirement.length > 0 && (
       <ul>
        {
          requirement.map((fields, i) => (
         
          <div key={i} className='flex gap-x-3 items-center'>
             <span className='text-base font-medium text-white'>{fields}</span> 
             <span className='text-richblack-200 text-sm font-medium cursor-pointer'
             onClick={()=> removeField(i)} >Clear</span> 
          </div>
         
          ))}
       </ul>
       )}
       
       
      {errors[name] && (
        <span className="ml-2 text-xs tracking-wide text-pink-200">
        {label} is required</span>
      )
      }

    </div>
  )
}

export default RequirementField