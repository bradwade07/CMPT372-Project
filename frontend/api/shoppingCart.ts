import { getSessionUserEmail } from "@/app/auth";
import { axios } from "./axios";
import { Product, ShoppingCartEntry } from "./product.types";

// mock entries
const generateProduct = (product_id: number): Product => ({
  product_id: product_id,
  product_name: "Wooden Stool",
  img_src: "/images/wood-stool.jpg",
  base_price: 15.2,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
});

const numberOfProducts = 8;
var shoppingCartEntries: ShoppingCartEntry[] = [];

for (let i = 1; i <= numberOfProducts; i++) {
  shoppingCartEntries.push({
    product: generateProduct(i),
    quantity: i,
  } as ShoppingCartEntry);
}

// gets the current user's shopping cart
export async function getShoppingCartProducts(): Promise<ShoppingCartEntry[]> {
  return shoppingCartEntries;

  // backend call
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      let response = await axios.get<ShoppingCartEntry[]>("/???", {
        data: {
          user_email: user_email,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Could not retrieve user's shopping cart");
    return [];
  }
}

// adds a product to the current user's shopping cart
export async function addToShoppingCart(
  product_id: number,
  quantity: number,
): Promise<void> {
  let newProduct = generateProduct(product_id);
  if (
    !shoppingCartEntries.find((item) => {
      return item.product.product_id == newProduct.product_id;
    })
  ) {
    shoppingCartEntries.push({ product: newProduct, quantity: quantity });
  }
  return;

  // backend call
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      await axios.post("/???", {
        data: {
          product_id: product_id,
          quantity: quantity,
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Could not add to user's shopping cart");
  }
}

// removes a products from the current user's shopping cart
export async function removeFromShoppingCart(
  product_id: number,
): Promise<void> {
  shoppingCartEntries = shoppingCartEntries.filter((item) => {
    return item.product.product_id != product_id;
  });
  return;

  // backend call
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      await axios.post("/???", {
        data: {
          product_id: product_id,
        },
      });
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Could not remove from user's shopping cart");
  }
}
