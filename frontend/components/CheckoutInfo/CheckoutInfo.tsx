"use client";

import { getShoppingCartProducts } from "@/api/shoppingCart";
import { CheckoutItemsList } from "./CheckoutItemsList";
import { OrderTotal } from "./OrderTotal";
import { DeliveryDetails } from "./AcquisitionDetails";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserAddress } from "@/api/user.type";
import { AcquisitionMethod } from "@/api/checkout.types";

export function CheckoutInfo() {
	const [acquisitionMethod, setAcquisitionMethod] =
		useState<AcquisitionMethod>();
	const [userAddress, setUserAddress] = useState<UserAddress>();

	const { isLoading, error, data } = useQuery({
		queryKey: ["shopping cart"],
		queryFn: getShoppingCartProducts,
		refetchOnMount: "always",
	});

	function onInfoSubmit(
		acquisitionMethod: AcquisitionMethod,
		deliveryDetails?: UserAddress
	) {
		if (acquisitionMethod == "delivery") {
			setUserAddress(deliveryDetails);
			setAcquisitionMethod("delivery");
			// TODO: POST the new user's address to the backend
		} else {
			setAcquisitionMethod("pickup");
		}
	}

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
