import {
  OrderHistoryEntry,
  Product,
  ProductFull,
  ProductListingCreation,
} from "./product.types";
import { axios } from "./axios";
import { isAxiosError } from "axios";
import { FiltersType, filtersToQueryString } from "./filters.types";
import { getSessionUserEmail } from "@/app/auth";

// Given a product's ID, returns all of that product's info
export async function getProduct(
  product_id: number,
): Promise<ProductFull | null> {
  try {
    let response = await axios.get<ProductFull>(`/getProduct/${product_id}`);

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }

    return null;
  }
}

// Returns a limited number of the most newest products
export async function getNewProducts(limit: number): Promise<Product[]> {
  try {
    let response = await axios.get<Product[]>(
      `/getNewestProductsByLimit/${limit}`,
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
}

// Returns all the products on sale, or a limited number of products if defined
export async function getSaleProducts(limit?: number): Promise<Product[]> {
  try {
    let limitNum = limit;
    if (!limitNum) {
      limitNum = -1;
    }

    let response = await axios.get<Product[]>(
      `/getProductsOnSaleByLimit/${limitNum}`,
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
}

// Returns products based on a set of filters
export async function getFilteredProducts(
  filters: FiltersType,
): Promise<Product[]> {
  const queryString = filtersToQueryString(filters);

  try {
    let response = await axios.get<Product[]>(
      `/getProductsByFilters?${queryString}`,
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
}

// Creates a new product listing using the submitted form data
export async function createProductListing(
  formData: ProductListingCreation,
): Promise<void> {
  const user_email = await getSessionUserEmail();
  if (user_email) {
    const {
      product_tags,
      main_product_img_file,
      additional_product_img_files,
      warehouse_ids,
      quantities,
      ...rest
    } = formData;

    try {
      axios.post(
        `/createProductListing`,
        {
          ...rest,
          user_email: user_email,
          // for each of these attributes below, having a garbage value at the end ensures that there will be at least 2 elements in this array and
          // forces this array to be posted as an array.
          // when there's only 1 item in the array it gets posted as an object instead of a single element array
          product_tags: [...product_tags, "placeholdertag"],
          warehouse_ids: [...warehouse_ids, -1],
          quantities: [...quantities, -1],
          product_images: [
            main_product_img_file,
            ...additional_product_img_files,
            new File(
              [new Blob([], { type: "image/jpeg" })],
              "placeholder.jpg",
              {
                type: "image/jpeg",
              },
            ),
          ],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
    } catch (error) {
      if (isAxiosError(error)) {
        console.error(error.response?.data || error.response || error);
      } else {
        console.error(error);
      }
    }
  } else {
    console.error("Could not create product listing");
  }
}

// changes the current price of a product to a new price
export async function updateProductPrice(
  product_id: number,
  new_price: number,
): Promise<void> {
  try {
    axios.patch("/updateProductPriceByProductId", {
      product_id: product_id,
      new_price: new_price,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }
  }
}

// deletes the product listing for the product ID
export async function deleteProductListing(product_id: number): Promise<void> {
  try {
    axios.delete("/deleteProductListingByProductId", {
      data: {
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
}

// Returns all of the available product tags
export async function getProductTags() {
  try {
    let response = await axios.get<string[]>("getAllProductTags");

    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }

    return [];
  }
}

// Returns all of a user's order history
export async function getUserOrderHistory(): Promise<OrderHistoryEntry[]> {
  const user_email = await getSessionUserEmail();
  if (user_email) {
    try {
      let response = await axios.get<OrderHistoryEntry[]>(
        `/getOrderHistoryByEmail/${user_email}`,
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
    console.error("Could not retrieve user order history");
    return [];
  }
}
