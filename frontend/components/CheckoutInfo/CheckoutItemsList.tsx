import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import { ShoppingCartEntry } from "@/api/product.types";

type CheckoutItemsListProps = {
	data: undefined | ShoppingCartEntry[];
};

export function CheckoutItemsList({ data }: CheckoutItemsListProps) {
	return (
		<div className="mx-4">
			<h3 className="text-xl flex justify-center mb-2">Review Items:</h3>
			<div className="max-h-[80vh] overflow-y-auto px-2">
				{data?.map((item) => (
					<div className="h-fit w-full my-2" key={item.product.productId}>
						<Card className="h-auto">
							<CardBody className="flex flex-row justify-between items-end">
								<div className="flex items-center">
									<Image
										src={item.product.imgSrc}
										alt={`${item.product.name} image`}
										width={50}
										height={50}
									/>
									<div>
										<p>{item.product.name}</p>
										<p>Price: ${item.product.price.toFixed(2)}</p>
										<p>Quantity: {item.quantity}</p>
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
