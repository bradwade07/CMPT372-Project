import { OrderHistoryProduct } from "@/api/product.types";
import { Card, CardBody } from "@nextui-org/react";
import React from "react";

type ProductEntryProps = {
  productEntry: OrderHistoryProduct;
};

// Displays a single item in the user's order history
export function ProductEntry({ productEntry }: ProductEntryProps) {
  return (
    <div className="h-fit w-full my-2" key={productEntry.product_id}>
      <Card className="h-auto">
        <CardBody className="flex flex-row justify-between items-end">
          <div className="flex items-center">
            <img
              src={`data:image/jpeg;base64, ${productEntry.product_main_img}`}
              alt={`${productEntry.product_name} image`}
              width={50}
              height={50}
            />
            <div>
              <p>{productEntry.product_name}</p>
              {productEntry.current_price < productEntry.base_price ? (
                <p>
                  <span className="line-through">
                    ${productEntry.base_price.toFixed(2)}
                  </span>
                  &nbsp;
                  <span className="text-red-500">
                    ${productEntry.current_price.toFixed(2)}
                  </span>
                </p>
              ) : (
                <p>${productEntry.base_price}</p>
              )}
              <p>Quantity: {productEntry.quantity}</p>
              <p>
                Delivery Method: {productEntry.delivery ? "Delivery" : "Pickup"}
              </p>
              {!productEntry.delivery && (
                <p>Pickup Warehouse ID: {productEntry.warehouse_id}</p>
              )}
            </div>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
