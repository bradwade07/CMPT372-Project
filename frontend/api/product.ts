import { Product } from "./product.types";
import { axios } from "./axios";

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

export async function getNewProducts() {
  const mock = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];
  return mock;
}

export async function getSaleProducts() {
  const mock = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
  ];
  return mock;
}
