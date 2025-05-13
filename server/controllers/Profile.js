const Course = require("../models/Course");
const Profile = require("../models/Profile");
const User = require("../models/User");
const mongoose = require("mongoose")
const { uploadImageToCloudinary} = require("../utils/imageUploader");
const {convertSecondsToDuration} = require("../utils/secToDuration")
const CourseProgress = require("../models/CourseProgress")


//update profile
exports.updatedProfile = async(req,res) => {
    try{
        //get data
        const { dateOfBirth = "", 
        about = "", gender= "", 
        contactNumber= "", } = req.body;
        //get userId
        const id = req.user.id;
        //validations

        // find profile by id
        const userDetails = await User.findById(id);
        const profile = await Profile.findById(userDetails.additionalDetails);

        
        //update the profile details
        
        
        profile.dateOfBirth = dateOfBirth;
        profile.about = about;
        profile.contactNumber = contactNumber;
        profile.gender = gender;

        // update db entry by save function because we only updated the function...not created aby function in db 
        await profile.save();

          // Find the updated user details
          const updatedUserDetails = await User.findById(id)
          .populate("additionalDetails")
          .exec()

        //return response
        return res.json({
            success:true,
            message:"Profile Updated Successfully",
            profile,
            updatedUserDetails,
        })
    }catch(error) {
        console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
		});
    }
}

//delete account
exports.deleteAccount = async(req,res) => {
    try{
        //schedule task for later
        //fetch id
        const userId = req.user.id;
       
        //find the user that needs to be deleted
        const user = await User.findById({_id:userId})
            if(!user) {
                return res.status(401).json({
                    success:false,
                    message:"User not found",
                });
            }

        //delete the assosiated profile with the user
        await Profile.findByIdAndDelete({_id: new mongoose.Types.ObjectId(user.additionalDetails)});

        //unenroll user from all the enrolled courses
        // await Course.findByIdAndUpdate(
        //     {_id:courseId},
        //     {
        //         $pull:{
        //             // pull this userId from studentEnrolled array that exists in courses
        //             studentEnrolled:userId,
        //         },
        //     }
        // )

        //delete user
        await User.findByIdAndDelete({_id:userId});
        
        //return response
        res.status(200).json({
            success:true,
            message:"User deleted successfully",
        })
    }catch(error){
        console.log(error);
		res.status(500).json({ 
                success: false, 
                message: "User Cannot be deleted successfully" 
            });
    }
}

//getAllUserDetails
exports.getAllUserDetails = async(req,res) => {
    try{
        const id = req.user.id;
        const userDetails = await User.findById(id)
                                      .populate("additionalDetails")
                                      .exec();
        // console.log(userDetails);
        res.status(200).json({
			success: true,
			message: "User Data fetched successfully",
			data: userDetails,
		});
    }catch(error) {
        return res.status(500).json({
			success: false,
			message: error.message,
		});
    }
}
//update display picture
exports.updateDisplayPicture = async(req,res) => {
    try{
        //fetch image from files
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        //upload image to cloudinary
        const image = await uploadImageToCloudinary (
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        // console.log(image);
        const updatedProfile = await User.findByIdAndUpdate(
            {_id:userId},
            {image:image.secure_url},
            {new:true}
        )
        //to send the response to client also
        res.send({
            success:true,
            message:`Image updated successfully`,
            data:updatedProfile,
        })
    }catch(error){
        console.log(error);
		res.status(500).json({ 
                success: false, 
                message: "Display Picture cannot be updated successfully" 
            });
    }
}

//enrolledCourses
exports.getEnrolledCourses = async (req,res) => {
    try{
        
        const userId = req.user.id;
        console.log(userId)
        const userDetails =  await User.findById(
            {_id: userId}).populate({
                path: "courses",
                populate: {
                  path: "courseContent",
                  populate: {
                    path: "subSection",
                  },
                },
              }).exec();

              // console.log("userDetails before", userDetails)

              // userDetails = userDetails.toObject()
              console.log("userDetails after", userDetails.toObject())
              var SubsectionLength = 0
              for (var i = 0; i < userDetails.courses.length; i++) {
                let totalDurationInSeconds = 0
                SubsectionLength = 0
                for (var j = 0; j < userDetails.courses[i].courseContent.length; j++) {
                  totalDurationInSeconds += userDetails.courses[i].courseContent[
                    j
                  ].subSection.reduce((acc, curr) => acc + parseInt(curr.timeDuration), 0)
                  userDetails.courses[i].totalDuration = convertSecondsToDuration(
                    totalDurationInSeconds
                  )
                  SubsectionLength +=
                    userDetails.courses[i].courseContent[j].subSection.length
                }
                let courseProgressCount = await CourseProgress.findOne({
                  courseID: userDetails.courses[i]._id,
                  userId: userId,
                })
                courseProgressCount = courseProgressCount?.completedVideo.length
                if (SubsectionLength === 0) {
                  userDetails.courses[i].progressPercentage = 100
                } else {
                  // To make it up to 2 decimal point
                  const multiplier = Math.pow(10, 2)
                  userDetails.courses[i].progressPercentage =
                    Math.round(
                      (courseProgressCount / SubsectionLength) * 100 * multiplier
                    ) / multiplier
                }
              }
        if (!userDetails) {
                return res.status(400).json({
                  success: false,
                  message: `Could not find user with id: ${userDetails}`,
                })
            }
            return res.status(200).json({
                success: true,
                data: userDetails.courses,
              })    
        
              
    }catch(error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}