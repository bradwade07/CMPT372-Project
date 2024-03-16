export type Product = {
	product_id: number;
	product_name: string;
	img_src: string;
	base_price: number;
	description: string;
};

export type ShoppingCartEntry = {
	product: Product;
	quantity: number;
};

export type WishlistEntry = {
	product: Product;
	quantity: number;
};
