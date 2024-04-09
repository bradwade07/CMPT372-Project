import { Card, CardBody } from "@nextui-org/react";
import { ShoppingCartEntry } from "@/api/product.types";

type CheckoutItemsListProps = {
  data: undefined | ShoppingCartEntry[];
};

// Displays all the items that the user is purchasing
export function CheckoutItemsList({ data }: CheckoutItemsListProps) {
  return (
    <div className="mx-4">
      <h3 className="text-xl flex justify-center mb-2">Review Items:</h3>
      <div className="max-h-[80vh] overflow-y-auto px-2">
        {data?.map((item) => (
          <div className="h-fit w-full my-2" key={item.product_id}>
            <Card className="h-auto">
              <CardBody className="flex flex-row justify-between items-end">
                <div className="flex items-center">
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
                    <p>
                      Delivery Method: {item.delivery ? "Delivery" : "Pickup"}
                    </p>
                    {!item.delivery && (
                      <p>Pickup Warehouse ID: {item.warehouse_id}</p>
                    )}
                  </div>
                </div>
              </CardBody>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
