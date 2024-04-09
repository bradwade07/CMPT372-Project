import { ShoppingCartEntry } from "@/api/product.types";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

type ShoppingCartItemProps = {
  item: ShoppingCartEntry;
  onItemRemove: (product_id: number) => void;
};

// Displays a card containing information on one item in a user's shopping cart
export function ShoppingCartItem({
  item,
  onItemRemove,
}: ShoppingCartItemProps) {
  return (
    <div className="h-fit w-full">
      <Card className="h-auto">
        <CardBody className="flex flex-row justify-between items-end">
          <div className="flex items-center justify-center gap-4">
            <img
              src={`data:image/jpeg;base64, ${item.product_main_img}`}
              alt={`${item.product_name} image`}
              className="object-contain h-[140px] w-[140px]"
            />
            <div>
              <p>{item.product_name}</p>
              {item.current_price < item.base_price ? (
                <p>
                  <span className="line-through">
                    ${item.base_price.toFixed(2)}
                  </span>
                  &nbsp;
                  <span className="text-red-500">
                    ${item.current_price.toFixed(2)}
                  </span>
                </p>
              ) : (
                <p>${item.base_price}</p>
              )}
              <p>Quantity: {item.quantity}</p>
              <p>Delivery Method: {item.delivery ? "Delivery" : "Pickup"}</p>
            </div>
          </div>
          <div>
            <p
              className="text-blue-600 text-sm cursor-pointer"
              onClick={() => onItemRemove(item.product_id)}
            >
              Remove
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
