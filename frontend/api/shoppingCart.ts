import { getSessionUserEmail } from "@/app/auth";
import { axios } from "./axios";
import { ShoppingCartEntry } from "./product.types";
import { isAxiosError } from "axios";

// Returns all the items in the current user's shopping cart
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

// Adds an item to the current user's shopping cart
// item is set to be delivered or not delivered (picked up)
// if set to be picked up, must have an associated warehouse ID
export default async function addToShoppingCart(
  product_id: number,
  quantity: number,
  delivery: boolean,
  warehouse_id?: number,
): Promise<void> {
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      await axios.post("/postProductToUserCart", {
        user_email: user_email,
        product_id: product_id,
        quantity: quantity,
        delivery: delivery,
        warehouse_id: warehouse_id,
      });
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data || error.response || error);
      } else {
        console.error(error);
      }
    }
  } else {
    console.error("Could not add item to user's cart");
  }
}

// Removes an item from the current user's shopping cart
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
