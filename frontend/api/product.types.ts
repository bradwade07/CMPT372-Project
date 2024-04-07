export type Product = {
  product_id: number;
  product_name: string;
  product_description: string;
  base_price: number;
  current_price: number;
  product_date_added: number;
  product_main_img: string;
  product_avg_rating: number;
};

export type ProductFull = {
  tags: string[];
  additional_img: string[];
} & Product;

export type ShoppingCartEntry = {
  quantity: number;
  delivery: boolean;
  warehouse_id: number | null;
} & Product;

export type WishlistEntry = {
  quantity: number;
} & Product;

export type ProductListingCreation = {
  product_name: string;
  product_description: string;
  base_price: number;
  current_price: number;
  product_tags: string[];
  main_product_img_file: File | null;
  additional_product_img_files: File[];
  warehouse_ids: number[];
  quantities: number[];
};

export type OrderHistoryEntry = {
  order_id: number;
  products: [OrderHistoryProduct];
  order_date: number;
};

export type OrderHistoryProduct = {
  product_id: number;
  product_name: string;
  product_description: string;
  base_price: number;
  current_price: number;
  product_date_added: number;
  product_main_img: string;
  quantity: number;
  warehouse_id: number;
  delivery: boolean;
};
