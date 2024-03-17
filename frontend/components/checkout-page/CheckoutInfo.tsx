"use client";

import { getShoppingCartProducts } from "@/api/shoppingCart";
import { CheckoutItemsList } from "./CheckoutItemsList";
import { OrderTotal } from "./OrderTotal";
import { DeliveryDetails } from "./AcquisitionDetails";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserAddress } from "@/api/user.types";
import { AcquisitionMethod } from "@/api/checkout.types";

// displays 3 "sections"
// 1) all the items' in the users cart which will be purchased
// 2) a form asking if a user wanted delivery or pickup, and then displays relevant information
// 3) the order total amount and paypal payment buttons
export function CheckoutInfo() {
  const [acquisitionMethod, setAcquisitionMethod] =
    useState<AcquisitionMethod>();
  const [userAddress, setUserAddress] = useState<UserAddress>();

  const { isLoading, error, data } = useQuery({
    queryKey: ["Shopping Cart"],
    queryFn: getShoppingCartProducts,
  });

  // performs actions depending on whether the user chooses "delivery" or "pickup"
  function onInfoSubmit(
    acquisitionMethod: AcquisitionMethod,
    deliveryDetails?: UserAddress,
  ) {
    if (acquisitionMethod == "delivery") {
      setUserAddress(deliveryDetails);
      setAcquisitionMethod("delivery");
      // TODO: POST the new user's address to the backend
    } else {
      setAcquisitionMethod("pickup");
    }
  }

  // triggers when the user goes to edit their delivery or pickup information, causes the paypal payment to no longer be visible
  function onInfoEdit() {
    setAcquisitionMethod(undefined);
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
          <OrderTotal data={data} acquisitionMethod={acquisitionMethod} />
        </div>
      </div>
    </div>
  );
}
