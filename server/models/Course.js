const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const courseSchema = new mongoose.Schema ({
     courseName:{
        type:String,
        requried:true,
       },
      courseDescription:{
        type:String,
       
       },
       instructor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        requried:true,
       },
       courseContent:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section",
       }],
       ratingAndReviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"ratingAndReviews",
       }],
       price:{
        type:Number,
       },
       thumbnail:{
        type:String,
       },
       tag:{
        type:[String],
        required:true,
       },
       category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
       },
       studentsEnrolled:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
       }],
       whatYouWillLearn:{
          type:String,
       },
       
       instructions: {
        type: [String],
      },
      status: {
        type: String,
        enum: ["Draft", "Published"],
      },

});

module.exports = mongoose.model("Course", courseSchema);