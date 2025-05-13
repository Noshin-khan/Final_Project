const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator = require("otp-generator");
const mailSender = require("../utils/mailSender");
const bcrypt = require("bcrypt");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");
const Profile = require("../models/Profile");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//send OTP for email verification
exports.sendOTP = async (req, res) => {
  try {
    //fetch email from request ki body
    const { email } = req.body;

    //check if user already exist
    const checkUserPresent = await User.findOne({ email });

    //if user already exist, then return a response
    if (checkUserPresent) {
      return res.status(401).json({
        success: false,
        message: "User already registered",
      });
    }

    //generate otp
    var otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    //check unique otp or not
    const result = await OTP.findOne({ otp: otp });
    while (result) {
      otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
      });
    }

    const otpPayload = { email, otp };
    // console.log(otpPayload)

    //create an entry for OTP
    await OTP.create(otpPayload);
    //return response successfylly
    res.status(200).json({
      success: true,
      message: "OTP Sent Successfully",
      otp,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

//signup for registrating users
exports.signUp = async (req, res) => {
  try {
    // Destructure fields from the request body
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      accountType,
      contactNumber,
      otp,
    } = req.body;

    //validate karlo
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword ||
      !otp
    ) {
      return res.status(403).json({
        success: false,
        message: "All fields are reqiured",
      });
    }

    //2 password match karlo
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: "Password and ConfirmPassword  do not match, Please try again",
      });
    }

    //check user already exist or not
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User is already resgisted",
      });
    }

    //find most recent OTP stored for the user

    const response = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
    console.log("res", response[0].expiresAt);
    const expirationTime = response[0].expiresAt;
    if (response.length === 0) {
      // OTP not found for the email
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (new Date() > expirationTime) {
      console.log("res", new Date());
      console.log("expire", expirationTime);
      await OTP.deleteMany({ email });
      return res.status(400).json({
        success: false,
        message: "The OTP has expired",
      });
    } else if (otp !== response[0].otp) {
      // Invalid OTP
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create additional profile for user
    const profileDetails = await Profile.create({
      gender: null,
      dateOfBirth: null,
      about: null,
      gender: null,
      contactNumber: null,
    });

    // create db entry
    const user = await User.create({
      firstName,
      lastName,
      email,
      contactNumber,
      password: hashedPassword,
      accountType: accountType,
      additionalDetails: profileDetails._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });

    await OTP.deleteMany({ email });

    //return response
    return res.status(200).json({
      success: true,
      message: "User is registered Successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again",
    });
  }
};

//login for authenticating users
exports.login = async (req, res) => {
  try {
    //get data from req body
    // console.log(req.body);
    const { email, password } = req.body;

    //validation data
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //user check exist or not
    const user = await User.findOne({ email }).populate("additionalDetails");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User is not registered. please signup first",
      });
    }

    //generate JWT token, after comparing password
    if (await bcrypt.compare(password, user.password)) {
      const payload = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "24h",
      });

      // save token to user document in db
      user.token = token;
      user.password = undefined;

      //create cookie and send response
      // const options = {
      //     expires: new Date(Date.now() + 3*24*60*60*1000),
      //     partitioned: true,
      //     SameSite: 'None',
      //     secure:true,
      //     httpOnly:true,

      // }
      // res.cookie("token", token, options).status(200).json({
      //     success:true,
      //     token,
      //     user,
      //     message:"Logged in successfully",
      // })
      //sending a json response only, this token can be saved on user's local machine
      // and then user can send that token through headers, there is builtin header called authorization header
      // and in this we have a authorization scheme called bearer and bearer means we are using token based authentication
      res.status(200).json({
        success: true,
        token,
        user,
        message: "Logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: "Passsword is incorrect",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Login Failure, Please Try Again",
    });
  }
};

//change password
exports.changePassword = async (req, res) => {
  try {
    //get userdata from req.user
    const userDetails = await User.findById(req.user.id);


    //get  oldPassword, newPassword, confirmNewPassword
    const { currentPassword, newPassword } = req.body;
    //validation for old password
    const isPasswordMatch = await bcrypt.compare(
      currentPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Password is incorrect, please write the correct password",
      });
    }

    //hash the password
    const encryptedPassword = await bcrypt.hash(newPassword, 10);
    // update password in DB
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    );
    //send mail - password updated
    //   try{
    //     const emailResponse = await mailSender(
    //         updatedUserDetails.email,
    //         passwordUpdated(
    //             updatedUserDetails.email,
    //             `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
    //         )
    //     );
    //     console.log("Email sent successfully:", emailResponse.response);
    //   }catch(error) {
    //     console.error("Error occurred while sending email:", error);
    // 	return res.status(500).json({
    // 		success: false,
    // 		message: "Error occurred while sending email",
    // 		error: error.message,
    // 		});
    //   }

    //return response
    res.json({
      success: true,
      message: "Password Changed Successfully",
      updatedUserDetails,
    });
  } catch (err) {
    return res.json({
      error: err.message,
      success: false,
      message: "Some Error in changing the Password",
    });
  }
};
