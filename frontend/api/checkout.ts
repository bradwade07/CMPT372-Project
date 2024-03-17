import { OnApproveData } from "@paypal/paypal-js";
import { axios } from "./axios";
import { getSessionUserData } from "@/app/auth";
import { AcquisitionMethod } from "./checkout.types";

// Creates a new paypal order
export async function createOrder(acquisitionMethod: AcquisitionMethod) {
  const user_email = (await getSessionUserData())?.email;

  if (user_email) {
    try {
      const response = await axios.post(`/api/orders`, {
        user_email: user_email,
        acquisitionMethod: acquisitionMethod,
      });

      return response.data;
    } catch (error: any) {
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Paypal error status:", error.response.status);
        console.error("Paypal error data:", error.response.data);

        // Returning error message
        return error.response.data;
      } else {
        console.error("Paypal error occurred: ", error);
      }
    }
  } else {
    throw Error("Could not retrieve user's email from session");
  }
}

// Gets information after a paypal payment is approved
export async function onTransactionApprove(data: OnApproveData) {
  try {
    const response = await axios.post(`/api/orders/${data.orderID}/capture`);

    return response.data;
  } catch (error: any) {
    if (error.response) {
      // The request was made and the server responded with a status code
      console.error("Paypal error status:", error.response.status);
      console.error("Paypal error data:", error.response.data);

      // Returning error message
      return error.response.data;
    } else {
      console.error("Paypal error occurred: ", error);
    }
  }
}
