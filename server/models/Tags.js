const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const tagSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
    },
});

module.exports = mongoose.model("Tag", tagSchema);