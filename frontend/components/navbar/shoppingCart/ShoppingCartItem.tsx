import { ShoppingCartEntry } from "@/api/product.types";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type ShoppingCartItemProps = {
  item: ShoppingCartEntry;
  onItemRemove: (product_id: number) => void;
};

export function ShoppingCartItem({
  item,
  onItemRemove,
}: ShoppingCartItemProps) {
  return (
    <div className="h-fit w-full">
      <Card className="h-auto">
        <CardBody className="flex flex-row justify-between items-end">
          <div className="flex items-center">
            <Image
              src={item.product.img_src}
              alt={`${item.product.product_name} image`}
              width={50}
              height={50}
            />
            <div>
              <p>{item.product.product_name}</p>
              <p>Price: ${item.product.base_price.toFixed(2)}</p>
              <p>Quantity: {item.quantity}</p>
            </div>
          </div>
          <div>
            <p
              className="text-blue-600 text-sm cursor-pointer"
              onClick={() => onItemRemove(item.product.product_id)}
            >
              Remove
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
