import { isAxiosError } from "axios";
import { axios } from "./axios";
import { Warehouse } from "./warehouse.types";

// returns the warehouse for the given warehouse_id
export async function getWarehouse(
  warehouse_id: number,
): Promise<Warehouse | null> {
  try {
    let response = await axios.get<Warehouse[]>("???"); // FIXME: backend url

    return response.data[0];
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(error.response?.data || error.response || error);
    } else {
      console.error(error);
    }

    return null;
  }
}

// returns the list of warehouses that have the product with product_id and quantity specified
export async function getInStockWarehouses(
  product_id: number,
  quantity: number,
): Promise<Warehouse[]> {
  try {
    let response = await axios.get<Warehouse[]>("???"); // FIXME: backend url

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
