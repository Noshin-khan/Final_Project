const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const contactUsSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    phoneNumber:{
        type:number,
        required:true,
    },
    message:{
        type:String,
        required:true,
    },
});

module.exports = mongoose.model("ContactUs", contactUsSchema);