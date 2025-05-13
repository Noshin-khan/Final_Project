const Course = require("../models/Course");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
const Category = require("../models/Category");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const {convertSecondsToDuration} = require('../utils/secToDuration');
const CourseProgress = require("../models/CourseProgress");

//Function to create a new course
exports.createCourse = async (req, res) => {
  try {
    // Get user ID from request object
    const userId = req.user.id;

    // Get all required fields from request body
    let {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      tag,
      category,
      status,
      instructions,
    } = req.body;
    // console.log("id",category)

    // Get thumbnail image from request files
    const thumbnail = req.files.thumbnailImage;

    // Check if any of the required fields are missing
    // if (
    // 	!courseName ||
    // 	!courseDescription ||
    // 	!whatYouWillLearn ||
    // 	!price ||
    // 	!tag ||
    // 	!thumbnail ||
    // 	!category
    // ) {
    // 	return res.status(400).json({
    // 		success: false,
    // 		message: "All Fields are Mandatory",
    // 	});
    // }
    if (!status || status === undefined) {
      status = "Draft";
    }
    // Check if the user is an instructor
    const instructorDetails = await User.findById(userId, {
      accountType: "Instructor",
    });

    if (!instructorDetails) {
      return res.status(404).json({
        success: false,
        message: "Instructor Details Not Found",
      });
    }

    // Check if the tag given is valid
    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category Details Not Found",
      });
    }
    // Upload the Thumbnail to Cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    // console.log(thumbnailImage);
    // Create a new course with the given details
    const newCourse = await Course.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      tag: tag,
      category: categoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      status: status,
      instructions: instructions,
    });

    // Add the new course to the User Schema of the Instructor
    await User.findByIdAndUpdate(
      {
        _id: instructorDetails._id,
      },
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );
    // Add the new course to the Categories
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );
    // Return the new course and a success message
    res.status(200).json({
      success: true,
      data:newCourse,
      message: "Course Created Successfully",
    });
  } catch (error) {
    // Handle any errors that occur during the creation of the course
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create course",
      error: error.message,
    });
  }
};
// GetAll Courses
exports.getAllCourses = async (req, res) => {
  try {
    const allCourses = await Course.find(
      {},
      {
        courseName: true,
        price: true,
        thumbnail: true,
        instructor: true,
        ratingAndReviews: true,
        studentsEnroled: true,
        courseDescription: true,
        status: true,
        tag:true,
      }
    )
      .populate("instructor")
      .sort({ createdAt: -1 })
      .exec();

    return res.status(200).json({
      success: true,
      data:allCourses,
    });
  } catch (error) {
    // console.log(error);
    return res.status(404).json({
      success: false,
      message: `Can't Fetch Course Data`,
      error: error.message,
    });
  }
};

//get course details
exports.getCourseDetails = async (req, res) => {
  try {
    //get id
    // console.log("hellloooo")
    // console.log("id",req.user.id)
    const { courseId } = req.body;
    //  console.log("courseId", courseId)
     const userId = req.user.id
    // console.log("user", userId)
    //find course details
    const courseDetails = await Course.findOne({ _id: courseId, })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndreviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

      // console.log("courseDetails", courseDetails)

    //validations
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find the course with ${courseId}`,
      });
    }

    const totalDurationInSeconds = courseDetails.courseContent.reduce((accumulator, content) => {
      return accumulator + content.subSection.reduce((subAccumulator, subSection) => {
        return subAccumulator + parseInt(subSection.timeDuration);
      }, 0);
    }, 0);

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    let courseProgressCount = await CourseProgress.findOne({
      courseID: courseId,
      userId: userId,
    })

    // console.log("courseProgressCount : ", courseProgressCount)
    //return response
    return res.status(200).json({
      success: true,
      message: "Course Details fetched successfully",
      data:{courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideo ? 
        courseProgressCount?.completedVideo : [] 
      }
        
  
    });
  } catch (error) {
    // console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInstructorCourseDetails = async(req,res) => {
  try{
        const instructorId= req.user.id;
        const instructorCourses = await Course.find(
          {id: instructorId,}
        )
        .sort({ createdAt: -1 })   
       res.status(200).json({
          success: true,
          data: instructorCourses,
        })
     

  }catch(error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    })
  }
}

//getFullCourseDetails including courseProgess
exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const course = await Course.findById(courseId);
	// console.log(course)

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    //Delete Sections and Subsections
	const courseSections = course.courseContent
        // console.log("courseSection", courseSections)
		// Delete sub-sections of the section
		for(const sectionId of courseSections) {
			const section = await Section.findById(sectionId)
			// console.log("Section", section)
			if (section) {
			  const subSections = section.subSection
			  for(const subSectionId of subSections) {
				await SubSection.findByIdAndDelete(subSectionId)
			  }
			}
			// Delete the section
		await Section.findByIdAndDelete(sectionId)
		}
	  
	 const category = course.category
    await Category.findByIdAndUpdate(
      { _id: category },
      {
        $pull: {
          course: course._id,
        },
      },
      { new: true }
    );
  
		
	  
    // Delete the course
    await Course.findByIdAndDelete(courseId);

    
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

//edit course details
exports.editCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    console.log(courseId)
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }
    const updates = req.body;
    console.log("update",updates.category)

    // If Thumbnail Image is found, update it
    if (req.files) {
      // console.log("thumbnail update");
      // console.log(req.files)
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }
  
    for (const key in updates) {
      if (updates.hasOwnProperty(key)) {
        course[key] = updates[key];
      }
    }
    const entercreated = await course.save();
    console.log("db entery",entercreated)

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      // .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({
      success: true,
      message: "Course updated successfully",
      data:updatedCourse,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
