import { Product, ShoppingCartEntry } from "./product.types";

// mock entries
const generateProduct = (productId: number): Product => ({
	productId: productId,
	name: "Wooden Stool",
	imgSrc: "/images/wood-stool.jpg",
	price: 15.2,
	description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
});

const numberOfProducts = 8;
var shoppingCartEntries: ShoppingCartEntry[] = [];

for (let i = 1; i <= numberOfProducts; i++) {
	shoppingCartEntries.push({
		product: generateProduct(i),
		quantity: i,
	} as ShoppingCartEntry);
}

// note: backend for these functions needs to access the session cookie to get shopping cart for this user
export async function getShoppingCartProducts(): Promise<ShoppingCartEntry[]> {
	return shoppingCartEntries;
}

export async function addToShoppingCart(productId: number, quantity: number) {}

export async function removeFromShoppingCart(productId: number) {
	shoppingCartEntries = shoppingCartEntries.filter((item) => {
		return item.product.productId != productId;
	});
}
