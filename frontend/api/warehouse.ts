import { isAxiosError } from "axios";
import { axios } from "./axios";
import { Warehouse } from "./warehouse.types";

const warehouses: Warehouse[] = [
  { warehouse_id: 1, lat: 49.283353, long: -123.122444 },
  { warehouse_id: 2, lat: 49.223287, long: -122.959533 },
  { warehouse_id: 3, lat: 49.22174, long: -122.600351 },
  { warehouse_id: 4, lat: 49.049775, long: -122.322996 },
  { warehouse_id: 5, lat: 49.162727, long: -121.948495 },
];

export async function getAllWarehouses(): Promise<Warehouse[]> {
  try {
    return warehouses;

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

// returns the warehouse for the given warehouse_id
export async function getWarehouse(
  warehouse_id: number,
): Promise<Warehouse | null> {
  try {
    return (
      warehouses.find((warehouse) => {
        return (warehouse.warehouse_id = warehouse_id);
      }) || null
    );

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
