export type Warehouse = {
  warehouse_id: number;
  lat: number;
  long: number;
};


export type WarehouseWithStock = {
  product_id: number;
  quantity: number;
} & Warehouse