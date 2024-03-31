import { isAxiosError } from "axios";
import { axios } from "./axios";
import { Warehouse } from "./warehouse.types";

export async function getAllWarehouses(): Promise<Warehouse[]> {
  try {
    const warehouses: Warehouse[] = [
      { warehouse_id: 1, lat: 1, long: 1 },
      { warehouse_id: 2, lat: 2, long: 2 },
      { warehouse_id: 3, lat: 3, long: 3 },
      { warehouse_id: 4, lat: 4, long: 4 },
      { warehouse_id: 5, lat: 5, long: 5 },
    ];

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
