export type Product = {
	productId: number;
	name: string;
	imgSrc: string;
	price: number;
	description: string;
};

export type ShoppingCartEntry = {
	product: Product;
	quantity: number;
};
