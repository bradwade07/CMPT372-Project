import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
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
          router.push(`/product/${product.product_id}`);
        }
      }}
    >
      <CardHeader className="py-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl">{product && product.product_name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <img
          alt="Card background"
          className="object-cover rounded-xl pb-2"
          src={(product && product.product_imgsrc) || "/images/grey.jpg"}
          width={270}
        />
        <p>
          ${product && product.base_price} ${product && product.current_price}
        </p>
        <p>{product && product.product_description}</p>
      </CardBody>
    </Card>
  );
}
