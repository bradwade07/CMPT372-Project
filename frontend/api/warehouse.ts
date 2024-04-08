import { isAxiosError } from "axios";
import { axios } from "./axios";
import { Warehouse, WarehouseWithStock } from "./warehouse.types";

// Returns all the warehouses
export async function getAllWarehouses(): Promise<Warehouse[]> {
  try {
    let response = await axios.get<Warehouse[]>("/getAllWarehouseInfo");

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

// Returns the warehouse for the given warehouse_id
export async function getWarehouse(
  warehouse_id: number,
): Promise<Warehouse | null> {
  try {
    let response = await axios.get<Warehouse[]>(
      `/getWarehouseInfo/${warehouse_id}`,
    );

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

// Returns the warehouses that have a specified product and in the specified quantity
export async function getInStockWarehouses(
  product_id: number,
  quantity: number,
): Promise<WarehouseWithStock[]> {
  try {
    let response = await axios.get<WarehouseWithStock[]>(
      `/getInStockWarehouses/${product_id}/${quantity}`,
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
