"use client";

import React, { useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import assert from "assert";
import { createOrder, onTransactionApprove } from "@/api/checkout";
import { OnApproveActions, OnApproveData } from "@paypal/paypal-js";
import { useRouter } from "next/navigation";
import { AcquisitionMethod } from "@/api/checkout.types";

// Renders errors or successful transactions on the screen.
function Message({ content }: { content: string }) {
	return <p>{content}</p>;
}

assert(
	process.env.PAYPAL_CLIENT_ID,
	"env variable not set or made publically available: PAYPAL_CLIENT_ID"
);

type PayPalType = {
	acquisitionMethod: AcquisitionMethod | undefined;
};

export function PayPal({ acquisitionMethod }: PayPalType) {
	const router = useRouter();

	const initialOptions = {
		clientId: process.env.PAYPAL_CLIENT_ID || "",
		"client-id": process.env.PAYPAL_CLIENT_ID,
		"enable-funding": "paylater,venmo,card",
		"disable-funding": "",
		"data-sdk-integration-source": "integrationbuilder_sc",
		currency: "CAD",
	};

	const [message, setMessage] = useState("");

	return (
		<div className="App">
			<PayPalScriptProvider options={initialOptions}>
				<PayPalButtons
					style={{
						shape: "pill",
						layout: "vertical",
					}}
					createOrder={async () => {
						try {
							if (!acquisitionMethod) {
								throw Error("Delivery or pickup option has not been chosen");
							}
							const orderData = await createOrder(acquisitionMethod);

							if (orderData.id) {
								return orderData.id;
							} else {
								const errorDetail = orderData?.details?.[0];
								const errorMessage = errorDetail
									? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
									: JSON.stringify(orderData);

								throw new Error(errorMessage);
							}
						} catch (error) {
							console.error(error);
							setMessage(`Could not initiate PayPal Checkout...${error}`);
							return `Could not initiate PayPal Checkout...${error}`;
						}
					}}
					onApprove={async (data: OnApproveData, actions: OnApproveActions) => {
						try {
							const orderData = await onTransactionApprove(data);
							// Three cases to handle:
							//   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
							//   (2) Other non-recoverable errors -> Show a failure message
							//   (3) Successful transaction -> Show confirmation or thank you message

							const errorDetail = orderData?.details?.[0];

							if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
								// (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
								// recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
								return actions.restart();
							} else if (errorDetail) {
								// (2) Other non-recoverable errors -> Show a failure message
								throw new Error(
									`${errorDetail.description} (${orderData.debug_id})`
								);
							} else {
								// (3) Successful transaction -> Show confirmation or thank you message
								// Or go to another URL:  actions.redirect('thank_you.html');
								const transaction =
									orderData.purchase_units[0].payments.captures[0];
								setMessage(
									`Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
								);
								console.log(
									"Capture result",
									orderData,
									JSON.stringify(orderData, null, 2)
								);
								router.push("/checkout/success");
							}
						} catch (error) {
							console.error(error);
							setMessage(
								`Sorry, your transaction could not be processed...${error}`
							);
						}
					}}
				/>
			</PayPalScriptProvider>
			<Message content={message} />
		</div>
	);
}
