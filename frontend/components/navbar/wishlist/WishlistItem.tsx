"use client";

import { Product } from "@/api/product.types";
import { Card, CardBody } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

type WishlistItemProps = {
  item: Product;
  onItemRemove: (product_id: number) => void;
};

// Displays a card containing information on one item in a user's shopping cart
// user can click on an item to go to that item's page
export function WishlistItem({ item, onItemRemove }: WishlistItemProps) {
  const router = useRouter();

  // when the user clicks on an item, navigates to that item's page
  function handleItemClick(event: React.MouseEvent) {
    router.push(`/product?product_id=${item.product_id}`);
  }

  return (
    <div className="h-fit w-full">
      <Card className="h-auto w-full" isPressable onClick={handleItemClick}>
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
