const mongoose = require("mongoose");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const profileSchema = new mongoose.Schema({
    gender:{
        type:String,
        trim:true,
    },
    dateOfBirth:{
        type:String,
    },
    about:{
        type:String,
        trim:true,
    },
    contactNumber: {
		type: Number,
		trim: true,
	},


});

module.exports = mongoose.model("Profile", profileSchema);