"use client";

import { getShoppingCartProducts } from "@/api/shoppingCart";
import { CheckoutItemsList } from "./CheckoutItemsList";
import { OrderTotal } from "./OrderTotal";
import { DeliveryDetails } from "./DeliveryDetails";
import { useQuery } from "@tanstack/react-query";
import { UserAddress } from "@/api/user.types";
import { updateUserAddress } from "@/api/user";
import { getSessionUserEmail } from "@/app/auth";
import { useState } from "react";

// displays 3 "sections"
// 1) all the items' in the users cart which will be purchased
// 2) a form asking if a user wanted delivery or pickup, and then displays relevant information
// 3) the order total amount and paypal payment buttons
export function CheckoutInfo() {
  const [deliveryFormSubmitted, setDeliveryFromSubmitted] = useState(false);

  const { isLoading, error, data } = useQuery({
    queryKey: ["Shopping Cart"],
    queryFn: getShoppingCartProducts,
  });

  // when the user submits their delivery info, updates their address and allows them to pay for their order
  async function onInfoSubmit(deliveryDetails?: UserAddress) {
    const user_email = await getSessionUserEmail();
    if (user_email && deliveryDetails) {
      await updateUserAddress(user_email, deliveryDetails);
      setDeliveryFromSubmitted(true);
    }
  }

  // triggers when the user goes to edit their delivery or pickup information, causes the paypal payment to no longer be visible
  function onInfoEdit() {
    setDeliveryFromSubmitted(false);
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="mt-4 mx-4 text-2xl">Check out</h2>
      <div className="flex flex-1 justify-center w-full mb-10 mt-8">
        <div className="w-1/3 mx-4">
          <CheckoutItemsList data={data} />
        </div>
        <div className="w-1/3 mx-4">
          <DeliveryDetails
            data={data}
            onInfoSubmit={onInfoSubmit}
            onInfoEdit={onInfoEdit}
          />
        </div>
        <div className="flex flex-col w-1/3 mx-4">
          <OrderTotal
            data={data}
            deliveryFormSubmitted={deliveryFormSubmitted}
          />
        </div>
      </div>
    </div>
  );
}
