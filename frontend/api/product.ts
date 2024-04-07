import {
  Product,
  ProductFull,
  ProductListing,
  ProductListingCreation,
} from "./product.types";
import { axios } from "./axios";
import { isAxiosError } from "axios";
import { FiltersType, filtersToQueryString } from "./filters.types";
import { getSessionUserEmail } from "@/app/auth";

// given a product's id, returns all that product's info
export async function getProduct(
  product_id: number,
): Promise<ProductFull | null> {
  try {
    let response = await axios.get<ProductFull>(`/getProduct/${product_id}`);

    console.log(response.data);

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

// returns a number of the newest products
export async function getNewProducts(limit: number): Promise<Product[]> {
  try {
    let response = await axios.get<Product[]>(
      `/getNewestProductsByLimit/${limit}`,
    );

    console.log(response.data);

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

// returns a number of products that are on sale
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

// returns basic info on all the products that fulfill a set of filters
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

    // console.log({
    //   ...rest,
    //   user_email: user_email,
    //   // for each of these attributes below, having a garbage value at the end ensures that there will be at least 2 elements in this array and
    //   // forces this array to be posted as an array.
    //   // when there's only 1 item in the array it gets posted as an object instead of a single element array
    //   product_tags: [...product_tags, "placeholdertag"],
    //   warehouse_ids: [...warehouse_ids, -1],
    //   quantities: [...quantities, -1],
    //   product_images: [
    //     main_product_img_file,
    //     ...additional_product_img_files,
    //     new File([new Blob([], { type: "image/jpeg" })], "placeholder.jpg", {
    //       type: "image/jpeg",
    //     }),
    //   ],
    // });

    try {
      await axios.post(
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
    await axios.patch("/updateProductPriceByProductId", {
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
    await axios.delete("/deleteProductListingByProductId", {
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
