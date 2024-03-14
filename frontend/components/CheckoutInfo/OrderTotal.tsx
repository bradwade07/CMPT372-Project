import { ShoppingCartEntry } from "@/api/product.types";
import { useEffect, useState } from "react";
import { PayPal } from "./PayPal";
import { AcquisitionMethod } from "@/api/checkout.types";

type OrderTotalProps = {
	data: undefined | ShoppingCartEntry[];
	acquisitionMethod: AcquisitionMethod | undefined;
};

export function OrderTotal({ data, acquisitionMethod }: OrderTotalProps) {
	const taxPercentage = 0.11;
	const shippingPercentage = 0.15;

	const [totalSubprice, setTotalSubprice] = useState(-1);
	const [totalPrice, setTotalPrice] = useState(-1);
	const [totalPriceVisible, setTotalPriceVisible] = useState(false);

	useEffect(() => {
		if (data) {
			let subtotal = 0;
			for (let item of data) {
				subtotal += item.quantity * item.product.price;
			}
			setTotalSubprice(Number(subtotal.toFixed(2)));

			if (acquisitionMethod) {
				if (acquisitionMethod == "delivery") {
					setTotalPrice(
						Number(
							(subtotal * (1 + taxPercentage + shippingPercentage)).toFixed(2)
						)
					);
				} else if (acquisitionMethod == "pickup") {
					setTotalPrice(Number((subtotal * (1 + taxPercentage)).toFixed(2)));
				}

				setTotalPriceVisible(true);
			} else {
				setTotalPriceVisible(false);
			}
		} else {
			setTotalPriceVisible(false);
		}
	}, [data, acquisitionMethod]);

	function getSubtotalPrice() {
		return (
			<div>
				{data?.map((item) => (
					<div key={item.product.productId} className="flex flex-row gap-2">
						<p>${item.product.price.toFixed(2)}</p>
						<p>x</p>
						<p>{item.quantity}</p>
						<p>= ${(item.product.price * item.quantity).toFixed(2)}</p>
					</div>
				))}
				<p>Total before taxes: ${totalSubprice.toFixed(2)}</p>
			</div>
		);
	}

	function getTotalPrice() {
		return (
			<div className="mt-4">
				<p>
					Tax (%{taxPercentage * 100}): $
					{(totalSubprice * taxPercentage).toFixed(2)}
				</p>
				{acquisitionMethod == "delivery" && (
					<p>
						Shipping cost (%{shippingPercentage * 100}): $
						{(totalSubprice * shippingPercentage).toFixed(2)}
					</p>
				)}
				<p>Total after tax: ${totalPrice}</p>
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
							<PayPal acquisitionMethod={acquisitionMethod} />
						</div>
					)}
				</>
			) : (
				<div className="mt-4">
					<p>Please choose delivery or pickup to see total price and pay</p>
				</div>
			)}
		</div>
	);
}
