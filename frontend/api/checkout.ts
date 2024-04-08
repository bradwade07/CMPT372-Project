import { OnApproveData } from "@paypal/paypal-js";
import { axios } from "./axios";
import { getSessionUserEmail } from "@/app/auth";
import { isAxiosError } from "axios";

// Calls backend api to create a new PayPal order
export async function createOrder() {
  const user_email = await getSessionUserEmail();

  if (user_email) {
    try {
      const response = await axios.post(`/api/orders`, {
        user_email: user_email,
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        // The request was made and the server responded with a status code
        console.error("Paypal error status:", error.response?.status);
        console.error("Paypal error data:", error.response?.data);

        // Returning error message
        return error.response?.data;
      } else {
        console.error("Paypal error occurred: ", error);
      }
    }
  } else {
    throw Error("Could not retrieve user's email from session");
  }
}

// Gets information after a paypal payment is approved/denied
export async function onTransactionApprove(data: OnApproveData) {
  const user_email = await getSessionUserEmail();

  if (user_email) {
    try {
      const response = await axios.post(`/api/orders/${data.orderID}/capture`, {
        user_email: user_email,
      });

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        // The request was made and the server responded with a status code
        console.error("Paypal error status:", error.response?.status);
        console.error("Paypal error data:", error.response?.data);

        // Returning error message
        return error.response?.data;
      } else {
        console.error("Paypal error occurred: ", error);
      }
    }
  }
}
