import { Product } from "./product.types";
import { axios } from "./axios";

// given a product's id, returns all that product's info
export async function getProduct(
	product_id: number
): Promise<Product | undefined> {
	const mock: Product = {
		product_id: product_id,
		product_name: "Wooden Stool",
		img_src: "/images/wood-stool.jpg",
		base_price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	};
	return mock;

	// backend call
	try {
		let response = await axios.get<Product>("/???", {
			data: {
				product_id: product_id,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
}

// returns a number of the newest products
export async function getNewProducts(limit: number): Promise<Product[]> {
	const generateProduct = (product_id: number): Product => ({
		product_id: product_id,
		product_name: "Wooden Stool",
		img_src: "/images/wood-stool.jpg",
		base_price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 20; // Define the number of products needed
	const products: Product[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;

	// backend call
	try {
		let response = await axios.get<Product[]>("/newestProducts", {
			data: {
				limit: limit,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
}

// returns a number of products that are on sale
export async function getSaleProducts(limit?: number): Promise<Product[]> {
	const generateProduct = (product_id: number): Product => ({
		product_id: product_id,
		product_name: "Wooden Stool",
		img_src: "/images/wood-stool.jpg",
		base_price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 20; // Define the number of products needed
	const products: Product[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;

	// backend call
	try {
		let requestData = {};

		if (limit != undefined) {
			requestData = { data: { limit: limit } };
		}

		let response = await axios.get<Product[]>("/productsOnSale", requestData);

		return response.data;
	} catch (error) {
		console.error(error);
	}
}

// returns basic info on all the products that fulfill a set of filters
export async function getFilteredProducts(
	filters: string[]
): Promise<Product[]> {
	const generateProduct = (product_id: number): Product => ({
		product_id: product_id,
		product_name: "Wooden Stool",
		img_src: "/images/wood-stool.jpg",
		base_price: 15.2,
		description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
	});

	const numberOfProducts = 23; // Define the number of products needed
	const products: Product[] = [];

	for (let i = 1; i <= numberOfProducts; i++) {
		products.push(generateProduct(i));
	}

	return products;

	// backend call
	try {
		let response = await axios.get<Product[]>("/???", {
			data: {
				filters: filters,
			},
		});

		return response.data;
	} catch (error) {
		console.error(error);
	}
}
