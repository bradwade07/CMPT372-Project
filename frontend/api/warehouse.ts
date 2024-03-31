import { isAxiosError } from "axios";
import { axios } from "./axios";
import { Warehouse } from "./warehouse.types";

export async function getAllWarehouses(): Promise<Warehouse[]> {
  try {
    const warehouses: Warehouse[] = [
      { warehouse_id: 1, latitude: 1, longitude: 1 },
      { warehouse_id: 2, latitude: 2, longitude: 2 },
      { warehouse_id: 3, latitude: 3, longitude: 3 },
      { warehouse_id: 4, latitude: 4, longitude: 4 },
      { warehouse_id: 5, latitude: 5, longitude: 5 },
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
