import React, { useEffect, useState } from "react";

import { IoAddCircleOutline } from "react-icons/io5";
import IconBtn from '../../common/IconBtn';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCheck } from "react-icons/fa";
import { FiEdit2 } from "react-icons/fi";
import { HiClock } from "react-icons/hi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { deleteCourse, getAllCourses } from "../../../services/operations/courseDetailsAPI";
import { formatDate } from "../../../services/formateDate";
import { COURSE_STATUS } from "../../../utils/constants";
import  ConfirmationModal  from "../../common/ConfirmationModal";


const MyCourse = () => {
  const navigate = useNavigate();

  const {token} = useSelector((state) => state.auth)

  const [getCourses, setGetCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [confirmationModal, setConfirmationModal] = useState(null);

  useEffect(() => {
    const getCourseDetails = async () => {
      setLoading(true);
      const courses = await getAllCourses();
      // console.log(courses);
      if (courses.length > 0) {
        setGetCourses(courses);
      }
      setLoading(false);
    };
    getCourseDetails();
  }, []);

  const handleDeleteCourse = async(id) => {
      setLoading(true)
      await deleteCourse({courseId: id}, token)
      const result = await getAllCourses(token) 
      if(result) {
        setGetCourses(result)
      }
      setConfirmationModal(null)
      setLoading(false)
  }

  return (
    <div className="w-11/12 max-w-maxContent mx-auto flex flex-col gap-y-14
   ">
      {/* header  */}
      <div className="flex justify-between">
        <p className="font-medium text-3xl font-inter text-richblack-25">
          My Course
        </p>
        <IconBtn text="New" onclick={() => navigate("/dashboard/add-course")}>
          <IoAddCircleOutline />
        </IconBtn>
      </div>

      {/* table */}
      <div className="border border-richblack-800 flex justify-evenly
       rounded-md py-4">
        <div className="w-[50%]">
          <p className="text-richblack-200 text-lg font-medium mb-2">Courses</p>
          {getCourses.map((course) => (
            <div className="flex gap-x-3 mt-6">
              <img
                src={course.thumbnail}
                alt={course.courseName}
                className="w-[90%] h-[90%] rounded-md "
              />
              <div className="text-sm gap-y-3 flex flex-col">
                <p className="text-white text-lg font-medium">
                  {" "}
                  {course.courseName}{" "}
                </p>
                <p className="text-richblack-200 ">
                  {course.courseDescription}{" "}
                </p>
                <p className="text-white">
                  {" "}
                  Created: {formatDate(course.instructor.createdAt)}{" "}
                </p>
                <p>
                  {course.status === COURSE_STATUS.DRAFT ? (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-pink-100">
                      <HiClock size={14} />
                      Drafted
                    </p>
                  ) : (
                    <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[12px] font-medium text-yellow-100">
                      <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                        <FaCheck size={8} />
                      </div>
                      Published
                    </p>
                  )}
                </p>

              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col">
          <p className="text-richblack-200 text-lg font-medium mb-2">
            Duration
          </p>
          <p className="text-richblack-100 text-base font-medium">
          {getCourses.map((course) => (
            <div className="mb-44">2hr 30min</div>
          ))}
          </p>
        </div>
        <div>
          <p className="text-richblack-200 text-lg font-medium mb-2"> Price </p>
          {getCourses.map((course) => (
            <p className="text-richblack-100 text-base font-medium mb-44">
              {" "}
              ₹{" "}{course.price}{" "}
            </p>
          ))}
        </div>

        <div className="text-richblack-100 text-lg font-medium">
          <p className="text-richblack-200 text-lg font-medium mb-2">
            {" "}
            Actions
          </p>
          {getCourses.map((course) => (
            <div>
              <button
                disabled={loading}
                onClick={() => {
                  navigate(`/dashboard/edit-course/${course._id}`);
                }}
                title="Edit"
                className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
              >
                <FiEdit2 />
              </button>

              <button
                disabled={loading}
                onClick={() => 
                  setConfirmationModal({
                    text1: "Do you want to delete this course?",
                    text2:
                          "All the data related to this course will be deleted",
                    btn1Text: !loading ? "Delete" : "Loading...  ",
                    btn2Text: "Cancel",
                    btn1Handler:!loading ? () => handleDeleteCourse(course._id) :
                    () => {},
                    btn2Handler: () => setConfirmationModal(null)

                  })
                 
                }
                title = "Delete"
                className="transition-all mb-44 duration-200 hover:scale-110 hover:text-pink-700"
              >
                <RiDeleteBin6Line />
              </button>
            </div>
          ))}
          <button></button>
        </div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
  );
};

export default MyCourse;
