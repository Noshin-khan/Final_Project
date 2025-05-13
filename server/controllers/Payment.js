const {instance} = require("../config/razorpay");
const mongoose = require("mongoose")
const Course = require("../models/Course")
const User = require("../models/User")
const mailSender = require("../utils/mailSender")
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail")
const CourseProgress = require('../models/CourseProgress')
const {paymentSuccessEmail} = require('../mail/templates/paymentSuccessEmail')
const crypto = require("crypto")

//capture the payment and initate the razorpay order use to initate order

exports.capturePayment = async(req,res) => {
    //get courseId and userId
    //we can buy more than 1 course at a time
    
    const {courses} = req.body;
    // console.log("course", courses)
    // console.log(courses)
    const userId = req.user.id; 
    //validations-->
    //1.validate course
    if(courses.length === 0) {
        return res.json({
            success:false,
            message:"Please provide valid courseId",
        })
    }
    //2.validate courseDetails and calculate total amount
    let totalAmount = 0;
    for(const course_id of courses) {
        // console.log(course_id)
        let course;
        try{
           course = await Course.findById(course_id);
           if(!course){
                return res.json({
                    success:false,
                    message:"Could not find the course",
                });
           }
        //3.user already paid for this course
        //converting string type userId into objectId
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success:false,
                message:'Student is already enrolled',
            });
        }

        totalAmount += course.price;
    }catch(error) {
            console.error(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            });
        }
    }

    
    //create order
    const amount = totalAmount;
    const currency = 'INR';
    const options ={
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
    };
    try{
//initiate the payment using razorpay
const paymentResponse = await instance.orders.create(options);
console.log(paymentResponse); 
//return response
return res.status(200).json({
    success:true,
    message:paymentResponse,
    courseName:courses.courseName,
    courseDescription:courses.courseDescription,
    thumbnail: courses.thumbnail,
    orderId: paymentResponse.id,
    currency:paymentResponse.currency,
    amount:paymentResponse.amount,
});
}catch(error){
    console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order",
        });
}
    
};

//verify signature of razorpay and server

exports.verifySignature = async(req,res) => {
    const razorpay_order_id = req.body?.razorpay_order_id
    const razorpay_payment_id = req.body?.razorpay_payment_id
    const razorpay_signature = req.body?.razorpay_signature
    const courses = req.body?.courses
    // console.log("courseID", courses)
    const userId = req.user.id
    // console.log("user",userId)

  //validations  
  if (
    !razorpay_order_id ||
    !razorpay_payment_id ||
    !razorpay_signature ||
    !courses ||
    !userId
  ) {
    return res.status(200).json({ success: false, message: "Payment Failed" })
  }

    //verify payment signature
    let body = razorpay_order_id + "|" + razorpay_payment_id

    const generated_signature =  crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
                                        .update(body.toString())
                                        .digest("hex")

    if (generated_signature == razorpay_signature) {
        //enroll students
        await enrolledStudents(courses, userId, res)
        //return res 
        return res.status(200).json({success: true, message: "Payment Verified"})
    }
    return res.status(200).json({ success: false, message: "Payment Failed" })
}


exports.sendPaymentSuccessEmail = async(req,res) => {
    const {orderId, paymentId, amount} = req.body
    const userId = req.user.id
    
    try{
        const enrolledStudent = await User.findById(userId);
        await mailSender(
            enrolledStudent.email,
            `Payment Received`,
            paymentSuccessEmail(
                `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
                amount/100,
                orderId,
                paymentId
            )

        )
    }catch (error) {
        console.log("error in sending mail", error)
        return res
          .status(400)
          .json({ success: false, message: "Could not send email" })
      }
}
    


//send payment success email

    //enroll the student in the course
const enrolledStudents = async (courses, userId, res) => {
    // console.log("courses", courses)
    // console.log("user", userId)
        if(!courses || !userId) {
            return res
            .status(400)
            .json({ success: false, message: "Please Provide Course ID and User ID" })
        }

        for(const course_id of courses) {
            try{

                //1.finding the course and adding the student into that course collection
                const enrolledCourse = await Course.findOneAndUpdate(
                    {_id: course_id},
                    {$push: {studentsEnrolled : userId}},
                    {new : true}
                )
                 if (!enrolledCourse) {
                    return res
                      .status(500)
                      .json({ success: false, error: "Course not found" })
                  }
                //   console.log("Updated course: ", enrolledCourse)

                  //2.creating course progess
                  const courseProgress = await CourseProgress.create({
                    courseID: course_id,
                    userId: userId,
                    completedVideo: [],
                  })
                  
                  //3.enrolling the student into the course he/she bought
                  const enrolledStudent = await User.findByIdAndUpdate(
                    userId,
                    {
                        $push: {
                            courses: course_id,
                            courseProgress: courseProgress._id
                        },
                    },
                    {new: true}
                  )
                  
                //   console.log("Enrolled student: ", enrolledStudent)

                  //4.send an email notification to the enrolled student
                  const emailResponse = await mailSender(
                    enrolledStudent.email,
                    `Successfully Enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(
                        enrolledCourse.courseName,
                        `${enrolledCourse.firstName} ${enrolledCourse.lastName}`
                    )
                  )
                //  console.log("Email sent successfully: ", emailResponse.response)
            }catch(error) {
                console.log(error)
                return res.status(400).json({ success: false, error: error.message })
            }
        }
    }
  
