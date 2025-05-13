import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import IconBtn from "../../common/IconBtn";

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-8 ">
      <h1 className="text-richblack-25 text-3xl font-semibold ">My Profile</h1>
      {/* 1 box */}
      <div className="bg-richblack-800 border px-12 flex items-center justify-between border-richblack-600 rounded-md">
        <div className="flex gap-4 mt-6 mb-6 items-center">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[78px] rounded-full objec-cover"
          />
          <div>
            <h1 className="text-richblack-25 font-semibold">{user?.firstName + " " + user?.lastName}</h1>
            <p className="text-richblack-300 text-sm">{user?.email}</p>
          </div>
        </div>
        <div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <FiEdit />
        </IconBtn>
        </div>
      </div>

      {/* 2nd box */}
      <div className="bg-richblack-800 px-12 border gap-y-5 p-8 flex flex-col justify-between border-richblack-600 rounded-md">
        <div className="flex justify-between">
          <h1 className="text-richblack-25 text-lg font-semibold">About</h1>
          <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <FiEdit />
        </IconBtn>
        </div>
        
        <div>
        <p className="text-richblack-300 text-sm">
          {user?.additionalDetails?.about ??
            "Write Something About Yourself..."}
        </p>
        </div>
       
      </div>
      {/* 3rd box */}
      <div className="bg-richblack-800 border gap-y-2 px-12  flex flex-col  border-richblack-600 rounded-md">
       <div className="flex justify-between items-center mt-8">
       <div>
          <h1 className="text-richblack-25 text-lg font-semibold">Personal Details</h1>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings");
          }}
        >
          <FiEdit />
        </IconBtn>
       </div>
        <div className="flex justify-between max-w-[500px]">
          <div className="gap-y-5 flex flex-col">
            <div className="flex flex-col gap-y-2">
              <p className="text-richblack-300 text-sm">First Name</p>
              <p className="text-richblack-25 font-semibold text-sm">{user?.firstName} </p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="text-richblack-300 text-sm">Email</p>
              <p className="text-richblack-25 font-semibold text-sm">{user?.email}</p>
            </div>
            <div className="flex flex-col gap-y-2">
              <p className="text-richblack-300 text-sm">Gender</p>
              <p className="text-richblack-25 font-semibold text-sm">{user?.additionalDetails?.gender ?? "Add Gender"}</p>
            </div>
            
          </div>

          <div className="gap-y-5 flex flex-col">
          <div className="flex flex-col gap-y-2">
              <p className="text-richblack-300 text-sm">Last Name</p>
              <p className="text-richblack-25 font-semibold text-sm">{user?.lastName} </p>
            </div>
           <div className="flex flex-col gap-y-2">
              <p className="text-richblack-300 text-sm">Phone Number</p>
              <p className="text-richblack-25 font-semibold text-sm">{user?.additionalDetails?.contactNumber ?? "Add Contact Number"}</p>
            </div>
            <div className="flex flex-col gap-y-2 mb-8">
              <p className="text-richblack-300 text-sm">Date of Birth</p>
              <p className="text-richblack-25 font-semibold text-sm">
                {user?.additionalDetails?.dateOfBirth ?? " Add Date Of Birth"}
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
