const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

//CREATE subSection
exports.createSubSection = async (req, res) => {
  try {
    //extract neccessary info for a given req body
    const { sectionId, title, description } = req.body;
    const video = req.files.video;
    // console.log("reqfile", req.files);
    // console.log("video", video);
    // console.log("tile" + title +  description);

    //check if all necessary fields are provided
    if (!sectionId || !title || !description || !video) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    //upload the video file to Cloudinary
    const uploadDetails = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );
    // console.log("Upploading file"+ uploadDetails);

    //create a new sub-section with the necessary info
    const SubSectionDetails = await SubSection.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
    });

    //update the entry in section
    const updatedSection = await Section.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubSectionDetails._id } },
      { new: true }
    ).populate("subSection");

    // Return the updated section in the response
    return res.status(200).json({ success: true, data: updatedSection });
  } catch (error) {
    // Handle any errors that may occur during the process
    console.error("Error creating new sub-section:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

//UPDATE subSection
exports.updateSubSection = async (req, res) => {
    // console.log("hello")
    try {
      const { sectionId, subSectionId, title, description } = req.body
       console.log("subSection", subSectionId)
    console.log("section", sectionId)

      const subSection = await SubSection.findById(subSectionId)
  
      if (!subSection) {
        return res.status(404).json({
          success: false,
          message: "SubSection not found",
        })
      }
  
      if (title !== undefined) {
        subSection.title = title
      }
  
      if (description !== undefined) {
        subSection.description = description
      }
      if (req.files && req.files.video !== undefined) {
        const video = req.files.video
        const uploadDetails = await uploadImageToCloudinary(
          video,
          process.env.FOLDER_NAME
        )
        subSection.videoUrl = uploadDetails.secure_url
        subSection.timeDuration = `${uploadDetails.duration}`
      }
  
      await subSection.save()
  
      // find updated section and return it
      const updatedSection = await Section.findById(sectionId).populate(
        "subSection"
      )
  
      console.log("updated section", updatedSection)
  
      return res.json({
        success: true,
        message: "Section updated successfully",
        data: updatedSection,
      })
    } catch (error) {
      console.error(error)
      return res.status(500).json({
        success: false,
        message: "An error occurred while updating the section",
      })
    }
  }

//DELETE subSection
exports.deleteSubSection = async (req, res) => {
  try {
    //fetch details
    const { subSectionId, sectionId } = req.body
    // console.log("subSection", subSectionId)
    // console.log("section", sectionId)

    //pull the details from section schema
    await Section.findByIdAndUpdate(
      { _id: sectionId },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    //delete the subsection
    const subSection = await SubSection.findByIdAndDelete({
      _id: subSectionId
    });
   console.log(subSection)
    //validations
    if (!subSection) {
      return res.json({
        success: false,
        message: "SubSection not found",
      });
    }

    // find updated section and return it
    const updatedSection = await Section.findById(sectionId).populate(
      "subSection"
    );
    // console.log("updated section", updatedSection);

    //return response
    return res.json({
      success: true,
      message: "Subsection deleted successfully",
      data: updatedSection,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting the sub section",
    });
  }
};
