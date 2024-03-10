import { Product, ShoppingCartEntry } from "./product.types";
import { axios } from "./axios";
import { GoogleCredentials } from "@/app/auth";

export async function getProduct(productId: number) {
	const mock: Product = {
		productId: productId,
		name: "Wooden Stool",
		imgSrc: "/images/wood-stool.jpg",
		price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	};
	return mock;
}

export async function getNewProducts(): Promise<Product[]> {
	const generateProduct = (productId: number): Product => ({
		productId: productId,
		name: "Wooden Stool",
		imgSrc: "/images/wood-stool.jpg",
		price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 20; // Define the number of products needed
	const products: Product[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;
}

export async function getSaleProducts(): Promise<Product[]> {
	const generateProduct = (productId: number): Product => ({
		productId: productId,
		name: "Wooden Stool",
		imgSrc: "/images/wood-stool.jpg",
		price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 20; // Define the number of products needed
	const products: Product[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;
}

export async function getCategoryProducts(
	filters: string[]
): Promise<Product[]> {
	const generateProduct = (productId: number): Product => ({
		productId: productId,
		name: "Wooden Stool",
		imgSrc: "/images/wood-stool.jpg",
		price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 23; // Define the number of products needed
	const products: Product[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;
}

// note: backend for this function needs to access the session cookie to get shopping cart for this user
export async function getShoppingCartProducts(): Promise<ShoppingCartEntry[]> {
	const generateProduct = (productId: number): Product => ({
		productId: productId,
		name: "Wooden Stool",
		imgSrc: "/images/wood-stool.jpg",
		price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 8;
	const shoppingCartEntries: ShoppingCartEntry[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		shoppingCartEntries.push({
			product: generateProduct(i),
			quantity: i,
		} as ShoppingCartEntry);
	}

	return shoppingCartEntries;
}
