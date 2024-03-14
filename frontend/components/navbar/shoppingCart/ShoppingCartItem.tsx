import { ShoppingCartEntry } from "@/api/product.types";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import React from "react";

type ShoppingCartItemProps = {
	item: ShoppingCartEntry;
	onItemRemove: (productId: number) => void;
};

export function ShoppingCartItem({
	item,
	onItemRemove,
}: ShoppingCartItemProps) {
	return (
		<div className="h-fit w-full">
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
					<div>
						<p
							className="text-blue-600 text-sm cursor-pointer"
							onClick={() => onItemRemove(item.product.productId)}
						>
							Remove
						</p>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}
