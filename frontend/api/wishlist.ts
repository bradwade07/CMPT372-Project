import { getSessionUserEmail } from "@/app/auth";
import { axios } from "./axios";
import { Product, WishlistEntry } from "./product.types";

// mock entries
const generateProduct = (product_id: number): Product => ({
  product_id: product_id,
  product_name: "Wooden Stool",
  img_src: "/images/wood-stool.jpg",
  base_price: 15.2,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
});

const numberOfProducts = 8;
var wishlistEntries: WishlistEntry[] = [];

for (let i = 1; i <= numberOfProducts; i++) {
  wishlistEntries.push({
    product: generateProduct(i),
    quantity: i,
  } as WishlistEntry);
}

// gets the current user's wishlist
export async function getWishlistProducts(): Promise<WishlistEntry[]> {
  return wishlistEntries;

  // backend call
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      let response = await axios.get<WishlistEntry[]>("/???", {
        data: {
          user_email: user_email,
        },
      });

      return response.data;
    } catch (error) {
      console.error(error);
    }
  } else {
    console.error("Could not retrieve user's wishlist");
    return [];
  }
}

// adds a product to the current user's wishlist
export async function addToWishlist(
  product_id: number,
  quantity: number,
): Promise<void> {
  let newProduct = generateProduct(product_id);
  if (
    !wishlistEntries.find((item) => {
      return item.product.product_id == newProduct.product_id;
    })
  ) {
    wishlistEntries.push({ product: newProduct, quantity: quantity });
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
    console.error("Could not add to user's wishlist");
  }
}

// removes a products from the current user's wishlist
export async function removeFromWishlist(product_id: number): Promise<void> {
  wishlistEntries = wishlistEntries.filter((item) => {
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
    console.error("Could not remove from user's wishlist");
  }
}
