export type Product = {
  product_id: number;
  product_name: string;
  product_imgsrc: string;
  base_price: number;
  current_price: number;
  product_description: string;
  product_date_added: number;
};

export type ShoppingCartEntry = {
  quantity: number;
} & Product;

export type WishlistEntry = {
  quantity: number;
} & Product;
