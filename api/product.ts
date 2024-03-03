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

export async function getNewProducts(): Promise<Product[]> {
  const mock: Product[] = [
    {
      productId: 1,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 2,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 3,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 4,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 5,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 6,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 7,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 8,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 9,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 10,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];
  return mock;
}

export async function getSaleProducts(): Promise<Product[]> {
  const mock: Product[] = [
    {
      productId: 1,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 2,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 3,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 4,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 5,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 6,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 7,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 8,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 9,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      productId: 10,
      name: "Wooden Stool",
      imgSrc: "/images/wood-stool.jpg",
      price: 15.2,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
  ];
  return mock;
}
