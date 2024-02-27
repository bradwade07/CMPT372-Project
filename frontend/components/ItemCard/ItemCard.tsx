import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useGetProduct } from "./api";

type ItemCardProps = {
  productId: number;
};

function ItemCard({ productId }: ItemCardProps) {
  const router = useRouter();

  const { isLoading, error, data } = useGetProduct(productId);

  return (
    <Card
      className="py-2 w-60"
      isPressable
      onClick={() => {
        if (!error && !isLoading) {
          router.push(`/product/${productId}`);
        }
      }}
    >
      <CardHeader className="py-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl">{data && data.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl pb-2"
          src={data && data.imgSrc}
          width={270}
        />
        <p>${data && data.price.toFixed(2)}</p>
        <p>{data && data.description}</p>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
