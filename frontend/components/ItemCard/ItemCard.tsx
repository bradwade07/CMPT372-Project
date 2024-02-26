import React from "react";
import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

type ItemCardProps = {
  name: string;
  imgSrc: string;
};

function ItemCard() {
  return (
    <Card className="py-2 w-60" isPressable>
      <CardHeader className="py-2 px-4 flex-col items-start">
        <h4 className="font-bold text-xl">Wooden Stool</h4>
      </CardHeader>
      <CardBody className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl pb-2"
          src="/images/wood-stool.jpg"
          width={270}
        />
        <p>$15.20</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
      </CardBody>
    </Card>
  );
}

export default ItemCard;
