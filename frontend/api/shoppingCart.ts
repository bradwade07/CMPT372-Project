import { getSessionUserEmail } from "@/app/auth";
import { axios } from "./axios";
import { ShoppingCartEntry } from "./product.types";
import { isAxiosError } from "axios";

// gets the current user's shopping cart
export async function getShoppingCartProducts(): Promise<ShoppingCartEntry[]> {
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      let response = await axios.get<ShoppingCartEntry[]>(
        `/getUserCartByUserEmail/${user_email}`,
      );

      return response.data;
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data || error.response || error);
      } else {
        console.error(error);
      }

      return [];
    }
  } else {
    console.error("Could not retrieve user's shopping cart");
    return [];
  }
}

// adds a product to the current user's shopping cart
export default async function addToShoppingCart(
  product_id: number,
  quantity: number,
): Promise<void> {
  // TODO: integrate when backend is working
  // backend call
  // const user_email = await getSessionUserEmail();
  // if (user_email) {
  //   try {
  //     await axios.post("/postProductToUserCart", {
  //       data: {
  //         product_id: product_id,
  //         quantity: quantity,
  //       },
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // } catch (error) {
  //   if (isAxiosError(error)) {
  //     console.error(error.response?.data || error.response || error);
  //   }
  //   else {
  //     console.error(error)
  //   }
  // }
}

// removes a products from the current user's shopping cart
export async function removeFromShoppingCart(
  product_id: number,
): Promise<void> {
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      await axios.delete("/deleteUserCartByPidUserEmail", {
        data: {
          user_email: user_email,
          product_id: product_id,
        },
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data || error.response || error);
      } else {
        console.error(error);
      }
    }
  } else {
    console.error("Could not remove item from user's shopping cart");
  }
}
