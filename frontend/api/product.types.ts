export type Product = {
  product_id: number;
  product_name: string;
  product_description: string;
  product_imgsrc: string;
  base_price: number;
  current_price: number;
  product_date_added: number;
  main_product_img: Blob;
};

export type ProductFull = {
  additional_product_img: Blob[];
  // TODO: reviews?
} & Product;

export type ShoppingCartEntry = {
  quantity: number;
} & Product;

export type WishlistEntry = {
  quantity: number;
} & Product;

export type ProductListingCreation = {
  product_name: string;
  product_description: string;
  base_price: number;
  current_price: number;
  main_product_img_file: File | null;
  additional_product_img_files: File[];
};
