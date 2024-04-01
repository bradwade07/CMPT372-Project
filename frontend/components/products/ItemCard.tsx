import React from "react";
import { Card, CardHeader, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Product } from "@/api/product.types";

type ItemCardProps = {
  isLoading: boolean;
  error: Error | null;
  product: Product;
};

export function ItemCard({ isLoading, error, product }: ItemCardProps) {
  const router = useRouter();

  return (
    <Card
      className="py-2 w-60"
      isPressable
      onClick={() => {
        if (!error && !isLoading) {
          router.push(`/product?product_id=${product.product_id}`);
        }
      }}
    >
      <CardHeader className="py-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl">{product.product_name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <img
          alt="Product Image"
          className="object-cover rounded-xl pb-2"
          src={`data:image/jpeg;base64, ${product.product_main_img}`}
          width={270}
        />
        {product.current_price < product.base_price ? (
          <p>
            <span className="line-through">
              ${product.base_price.toFixed(2)}
            </span>
            &nbsp;
            <span className="text-red-500">
              ${product.current_price.toFixed(2)}
            </span>
          </p>
        ) : (
          <p>${product.base_price}</p>
        )}
        <p>{product.product_description}</p>
      </CardBody>
    </Card>
  );
}
