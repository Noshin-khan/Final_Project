const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const subSectionSchema = new mongoose.Schema({
     title:{
        type:String,
     },
     timeDuration:{
        type:String,
     },
     description:{
        type:String,
     },
     videoUrl:{
        type:String,
     },
});

module.exports = mongoose.model("SubSection", subSectionSchema);