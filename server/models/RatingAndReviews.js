const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const ratingAndReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        requried:true,
        ref:"User",
    },
    rating:{
        type:Number,
        requried:true,
    },
    review:{
        type:String,
        required:true,
    },
    course: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		ref: "Course",
		index: true,
	},
});

module.exports = mongoose.model("RatingAndReview", ratingAndReviewSchema);