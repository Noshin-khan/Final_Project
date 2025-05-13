const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
// mongoose.set('bufferCommands', false);
// mongoose.set('autoCreate',false);

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    expiresAt: {
        type: Date,
        default: Date.now() + 5* 60 * 1000 // OTP expires after 60 seconds
    }
})

// a function -> to send email
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(
            email, 
            "Verification Email from StudyNotion", 
            emailTemplate(otp));
        console.log("Email sent Successfully: ", mailResponse.response);
    }catch(error) {
        console.log("Error occured while sending mails: ", error);
        throw error;
    }
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
	if (this.isNew) {
		await sendVerificationEmail(this.email, this.otp);
	}
	next();
 });

module.exports = mongoose.model("OTP", OTPSchema);