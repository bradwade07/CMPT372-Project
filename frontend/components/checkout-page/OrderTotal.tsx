import { ShoppingCartEntry } from "@/api/product.types";
import { useEffect, useState } from "react";
import { PayPal } from "./PayPal";

type OrderTotalProps = {
  data: undefined | ShoppingCartEntry[];
  deliveryFormSubmitted: boolean;
};

// Displays a full breakdown of what the user is paying
export function OrderTotal({ data, deliveryFormSubmitted }: OrderTotalProps) {
  const taxPercentage = 0.11;
  const deliveryPercentage = 0.1;

  const [pickupSubtotal, setPickupSubtotal] = useState(0);
  const [deliverySubtotal, setDeliverySubtotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalPriceVisible, setTotalPriceVisible] = useState(false);

  // whenever props change, calculates the subtotal of delivered items, subtotal of picked up items, taxes and fees, total price,
  // then displays total price if the user has submitted their delivery information
  useEffect(() => {
    if (data) {
      let pickupSubtotal = 0;
      let deliverySubtotal = 0;
      for (let item of data) {
        if (item.delivery) {
          deliverySubtotal += item.quantity * item.current_price;
        } else {
          pickupSubtotal += item.quantity * item.current_price;
        }
      }
      setPickupSubtotal(pickupSubtotal);
      setDeliverySubtotal(deliverySubtotal);

      if (deliveryFormSubmitted) {
        const tax = (pickupSubtotal + deliverySubtotal) * taxPercentage;
        const deliveryFee = deliverySubtotal * deliveryPercentage;

        setTotalPrice(
          Number(
            (pickupSubtotal + deliverySubtotal + tax + deliveryFee).toFixed(2),
          ),
        );
        setTotalPriceVisible(true);
      } else {
        setTotalPriceVisible(false);
      }
    } else {
      setTotalPriceVisible(false);
    }
  }, [data, deliveryFormSubmitted]);

  // Displays the price for each item, then the total subprice before taxes and fees
  function getItemizedPrice(): React.JSX.Element {
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
        <p>
          Total before taxes and fees: $
          {(pickupSubtotal + deliverySubtotal).toFixed(2)}
        </p>
      </div>
    );
  }

  // Displays the price of taxes and fees, and the total price
  function getTotalPrice(): React.JSX.Element {
    return (
      <div className="mt-4">
        <p>
          Tax ({taxPercentage * 100}%): $
          {((pickupSubtotal + deliverySubtotal) * taxPercentage).toFixed(2)}
        </p>
        <p>
          Delivery fees ({deliveryPercentage * 100}% on delivered items&apos;
          price): ${(deliverySubtotal * deliveryPercentage).toFixed(2)}
        </p>
        <p>Total after tax and fees: ${totalPrice.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl flex justify-center mb-2">Order Total:</h3>
      {getItemizedPrice()}
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
