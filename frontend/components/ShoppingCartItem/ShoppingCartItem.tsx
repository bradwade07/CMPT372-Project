import { ShoppingCartEntry } from "@/api/product.types";
import { Card, CardBody } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type ShoppingCartItemProps = {
	item: ShoppingCartEntry;
};

function ShoppingCartItem({ item }: ShoppingCartItemProps) {
	return (
		<div className="h-fit w-full">
			<Card className="h-auto">
				<CardBody className="flex flex-row justify-between items-end">
					<div className="flex items-center">
						{" "}
						{/* Nested div to group image and text */}
						<Image
							src={item.product.imgSrc}
							alt={`${item.product.name} image`}
							width={50}
							height={50}
						></Image>
						<div>
							<p>{item.product.name}</p>
							<p>Price: ${item.product.price.toFixed(2)}</p>
							<p>Quantity: {item.quantity}</p>
						</div>
					</div>
					<div>
						{" "}
						{/* Right-aligned content */}
						<Link href="#" className="text-blue-600 text-sm">
							Remove
						</Link>
					</div>
				</CardBody>
			</Card>
		</div>
	);
}

export default ShoppingCartItem;
