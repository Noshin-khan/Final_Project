import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AiFillCaretDown } from "react-icons/ai";
import { FaPlus } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSortDown } from "react-icons/bi";
import { IoMdArrowDropup } from "react-icons/io";
import ConfirmationModal from "../../../../common/ConfirmationModal";
import SubSectionModal from "./SubSectionModal";
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import { setCourse } from "../../../../../slices/courseSlice";

const NestedView = ({ handleChangeEditSectionName }) => {
  const { course } = useSelector((state) => state.course);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [addSubSection, setAddSubSection] = useState(null);
  const [viewSubSection, setViewSubSection] = useState(null);
  const [editSubSection, setEditSubSection] = useState(null);
  const [dropdown, setDropdown] = useState(false);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleDeleteSection = async(sectionId) => {
     const result = await deleteSection({
      sectionId,
      courseId: course._id,
      token
     })

     if(result) {
      dispatch(setCourse(result))
     }
     setConfirmationModal(null)
  };


  
  const handleDeleteSubSection = async(subSectionId, sectionId) => {
 
      const result = await deleteSubSection({
           subSectionId, 
           sectionId,
           token
      })
      if(result) {
           console.log("result", result)
          // update the structure of course
         const updatedCourseContent = course.courseContent.map((section) => 
          section._id === sectionId ? result : section
         )
         const updatedCourse = { ...course, courseContent: updatedCourseContent }
         dispatch(setCourse(updatedCourse))
       }
       setConfirmationModal(null)
  }

  const handleDropDown = () => {
    setDropdown(!dropdown);
  };

  return (
    <>
      <div>
        <div className="text-richblack-100 border-[1px] border-richblack-400 mb-6 p-6 px-8 mt-6 bg-richblack-700 rounded-md flex flex-col divide-y-[1px] divide-richblack-300">
          {course?.courseContent?.map((section) => (
            <details key={section._id} open>
              <summary className="flex cursor-pointer items-center justify-between py-2">
                <div className="flex items-center gap-x-3">
                  <BiSortDown className="text-xl" />
                  <p className="font-semibold text-xl">{section.sectionName}</p>
                </div>
                <div className="flex gap-x-3">
                  <button
                    onClick={() =>
                      handleChangeEditSectionName(
                        section._id,
                        section.sectionName
                      )
                    }
                  >
                    <MdEdit />
                  </button>
                  <button
                    onClick={() =>
                      setConfirmationModal({
                        text1: "Delete this Section?",
                        text2:
                          "All the lectures in this section will be deleted",
                        btn1Text: "Delete",
                        btn2Text: "Cancel",
                        btn1Handler: () => handleDeleteSection(section._id),
                        btn2Handler: () => setConfirmationModal(null),
                      })
                    }
                  >
                    <RiDeleteBin6Line />
                  </button>
                  <div className="w-[1px] border"></div>

                  <button onClick={handleDropDown}>
                    {dropdown ? (
                      <IoMdArrowDropup size={32} />
                    ) : (
                      <AiFillCaretDown size={24} />
                    )}
                  </button>
                </div>
              </summary>

              <div>
                {section.subSection.map((data) => (
                  <div
                    key={data?._id}
                    onClick={() => setViewSubSection(data)}
                    className="flex items-center justify-between gap-x-3"
                  >
                    <div className="flex items-center gap-x-3">
                      <BiSortDown className="text-xl" />
                      <p className="font-semibold text-xl">{data.title}</p>
                    </div>
                    <div onClick={(e) => e.stopPropagation()} className="flex gap-x-2">
                      <button
                        onClick={() => setEditSubSection({...data, sectionId: section._id})
                        }
                      >
                        <MdEdit />
                      </button>
                      <button
                        onClick={() =>
                          setConfirmationModal({
                            text1: "Delete this Sub-Section?",
                            text2: "This lecture will be deleted",
                            btn1Text: "Delete",
                            btn2Text: "Cancel",
                            btn1Handler: () => handleDeleteSubSection(data._id, section._id),
                            btn2Handler: () => setConfirmationModal(null),
                          })
                        }
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </div>
          ))}

                <button
                  onClick={() => setAddSubSection(section._id)}
                  className="flex text-yellow-50 gap-x-3 items-center text-lg font-semibold"
                >
                  <FaPlus size={18} />
                  <p>Add Lecture</p>
                </button>
              </div>
            </details>
          ))}
        </div>
        {addSubSection ? (
          <SubSectionModal 
          modalData= {addSubSection}
          setModalData={setAddSubSection}
          add={true} />) 

        : viewSubSection ? (
          <SubSectionModal 
          modalData= {viewSubSection}
          setModalData={setViewSubSection}
          view={true}
          />) 

        :editSubSection ? (
          <SubSectionModal 
          modalData={editSubSection}
          setModalData={setEditSubSection}
          edit={true}
          />) 
        :
        (<></>)}
      </div>
      {/* confirmationaal Modal */}
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default NestedView;
