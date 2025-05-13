import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../../common/IconBtn";
import { useSelector } from "react-redux";
import { changePassword } from "../../../../services/operations/profileAPI";

const UpdatePassword = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  // console.log("hello world")

  const submitPasswordForm = async (data) => {
    console.log("password data-", data);
    console.log("world");
    try {
      await changePassword(token, data);
    } catch (error) {
      console.log("ERROR MESSAGE :", error.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submitPasswordForm)}>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
          <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col relative lg:w-[48%]">
              <label htmlFor="currentPassword" className="label-style">
                New Password
              </label>
              <input
                type={showCurrentPassword ? "text" : "password"}
                placeholder="Enter Current Password"
                id="currentPassword"
                name="currentPassword"
                className="form-style"
                {...register("currentPassword", { required: true })}
              />

              <span
                className="text-richblack-100 absolute top-9 right-6"
                onClick={() => setShowCurrentPassword((prev) => !prev)}
              >
                {showCurrentPassword ? (
                  <AiOutlineEyeInvisible size={25} />
                ) : (
                  <AiOutlineEye size={25} />
                )}
              </span>
              {errors.oldPassword && (
                <span className="text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>

            <div className="flex flex-col relative lg:w-[48%]">
              <label htmlFor="newPassword" className="label-style">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                placeholder="Enter New Password"
                id="newPassword"
                name="newPassword"
                className="form-style"
                {...register("newPassword", { required: true })}
              />

              <span
                className="text-richblack-100 absolute top-9 right-6"
                onClick={() => setShowNewPassword((prev) => !prev)}
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible size={25} />
                ) : (
                  <AiOutlineEye size={25} />
                )}
              </span>
              {errors.newPassword && (
                <span className="text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex gap-x-3 mt-4 justify-end">
          <button
            onClick={() => {
              navigate("/dashboard/my-profile");
            }}
            className="bg-richblack-800 text-richblack-400 font-semibold 
        rounded-md p-2 px-3"
          >
            Cancel
          </button>
          <IconBtn type="submit" text="Update" />
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
