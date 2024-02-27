import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

// TODO: get actual data
const mock = {
  name: "Wooden Stool",
  imgSrc: "/images/wood-stool.jpg",
  price: 15.2,
  description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
};

type ItemCardProps = {
  productId: string;
};

function ItemCard({ productId }: ItemCardProps) {
  return (
    <Card className="py-2 w-60" isPressable>
      <CardHeader className="py-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl">{mock.name}</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl pb-2"
          src={mock.imgSrc}
          width={270}
        />
        <p>${mock.price.toFixed(2)}</p>
        <p>{mock.description}</p>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
