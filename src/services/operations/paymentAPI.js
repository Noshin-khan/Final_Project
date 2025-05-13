import toast from "react-hot-toast";
import { paymentEndpoints } from "../apis";
import { apiConnector } from "../apiconnector";
import rzpLogo from "../../assets/Logo/rzp_logo.png";
import { setPaymentLoading } from "../../slices/courseSlice";
const RAZORPAY_KEY = 'rzp_test_X5FYP6pZuvZiGo'
// const BASE_URL = process.env.REACT_APP_BASE_URL
// const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY


const {
  CAPTUREPAYMENT_API,
  VERIFYSIGNATURE_API,
  SEND_PAYMENT_SUCCESS_EMAIL_API,
} = paymentEndpoints;

// Function to load script and append in DOM tree.
const loadScript = (src) =>
  new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      console.log("razorpay loaded successfully");
      resolve(true);
    };
    script.onerror = () => {
      console.log("error in loading razorpay");
      resolve(false);
    };
    document.body.appendChild(script);
  });
export async function BuyCourse(
  token,
  courses,
  user_details,
  navigate,
  dispatch
) {
  //  console.log("course",typeof(courses))
  const toastId = toast.loading("Loading...");
  try {
    console.log("RAZOR",RAZORPAY_KEY)
    // Loading the script of Razorpay SDK
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );
    if (!res) {
      console.log("Razorpay SDK failed to load. Are you online?");
      return;
    }
    //Initiating the order in backend
    const orderResponse = await apiConnector(
      "POST",
      CAPTUREPAYMENT_API,
      {
        courses,
      },
      {
        Authorization:`Bearer ${token}`,
      }
    );
    
    if (!orderResponse.data.success) {
      throw new Error(orderResponse.data.message);
    }
    console.log(
      "PAYMENT RESPONSE FROM BACKEND............",
      orderResponse
    );
   
    // Opening the Razorpay SDK
    const options = {
      key: RAZORPAY_KEY,
      currency: orderResponse.data.currency,
      amount: `${orderResponse.data.amount}`,
      order_id: orderResponse.data.message.id,
      name: "StudyNotion",
      description: "Thank you for Purchasing the Course.",
      image: rzpLogo,
      prefill: {
        name: `${user_details.firstName} ${user_details.lastName}`,
        email: user_details.email,
      },
      handler: function (response) {
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.amount,
          token
        );
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };
    const paymentObject = new window.Razorpay(options)
    paymentObject.open()
    paymentObject.on("payment failed", function (response) {
      toast.error("Oops! Payment Failed.")
      console.log(response.error)
    })
  } catch (error) {
    console.log("PAYMENT API ERROR...", error);
    toast.dismiss("Could not make payment");
  }
  toast.dismiss(toastId);
}

export async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    await apiConnector(
      "POST",
      SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    console.log("PAYMENT SUCCESS EMAIL ERROR............", error);
  }
}

export async function verifyPayment(bodyData, token, navigate, dispatch) {
    const toastId = toast.loading("Loading...");
    dispatch(setPaymentLoading(true))
    try{
         const response = await apiConnector("POST", VERIFYSIGNATURE_API, bodyData, {
            Authorization: `Bearer ${token}`,
         })
        //  if (!response.data.success) {
        //     throw new Error(response.data.message)
        //   }
        console.log(
          "VERIFYSIGNATURE_API............",response
        );
          toast.success("Payment Successful. You are Added to the course ")
          navigate("/dashboard/enrolled-courses") 
          //dispatch(resetCart())
    }catch(error) {
        console.log("PAYMENT VERIFY ERROR............", error)
        toast.error("Could Not Verify Payment.")
    }
    toast.dismiss(toastId)
    dispatch(setPaymentLoading(false))
}
