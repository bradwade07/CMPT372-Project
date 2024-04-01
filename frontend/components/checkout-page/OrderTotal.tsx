import { ShoppingCartEntry } from "@/api/product.types";
import { useEffect, useState } from "react";
import { PayPal } from "./PayPal";

type OrderTotalProps = {
  data: undefined | ShoppingCartEntry[];
  deliveryFormSubmitted: boolean;
};

// TODO: properly display delivery fees for products being delivered
export function OrderTotal({ data, deliveryFormSubmitted }: OrderTotalProps) {
  const taxPercentage = 0.11;
  const shippingPercentage = 0.1;

  const [totalSubprice, setTotalSubprice] = useState(-1);
  const [totalPrice, setTotalPrice] = useState(-1);
  const [totalPriceVisible, setTotalPriceVisible] = useState(false);

  // whenever props change, calculates the subtotal price, total price, and displays total price is all props are defined
  useEffect(() => {
    if (data) {
      let subtotal = 0;
      for (let item of data) {
        subtotal += item.quantity * item.current_price;
      }
      setTotalSubprice(Number(subtotal.toFixed(2)));

      if (deliveryFormSubmitted) {
        setTotalPrice(Number((subtotal * (1 + taxPercentage)).toFixed(2)));
        setTotalPriceVisible(true);
      } else {
        setTotalPriceVisible(false);
      }
    } else {
      setTotalPriceVisible(false);
    }
  }, [data, deliveryFormSubmitted]);

  function getSubtotalPrice(): React.JSX.Element {
    return (
      <div>
        {data?.map((item) => (
          <div key={item.product_id} className="flex flex-row gap-2">
            <p>${item.current_price.toFixed(2)}</p>
            <p>x</p>
            <p>{item.quantity}</p>
            <p>= ${(item.current_price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
        <p>Total before taxes: ${totalSubprice.toFixed(2)}</p>
      </div>
    );
  }

  function getTotalPrice(): React.JSX.Element {
    return (
      <div className="mt-4">
        <p>
          Tax (%{taxPercentage * 100}): $
          {(totalSubprice * taxPercentage).toFixed(2)}
        </p>
        <p>Total after tax: ${totalPrice.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl flex justify-center mb-2">Order Total:</h3>
      {getSubtotalPrice()}
      {totalPriceVisible ? (
        <>
          {getTotalPrice()}
          {data && (
            <div className="mt-4">
              <PayPal />
            </div>
          )}
        </>
      ) : (
        <div className="mt-4">
          <p>Please confirm your delivery details to see total price and pay</p>
        </div>
      )}
    </div>
  );
}
