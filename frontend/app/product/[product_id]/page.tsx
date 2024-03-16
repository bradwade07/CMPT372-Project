"use client";

import { getProduct } from "@/api/product";
import { addToShoppingCart } from "@/api/shoppingCart";
import { addToWishlist } from "@/api/wishlist";
import { getSession } from "@/app/auth";
import { TopNavbar } from "@/components/navbar";
import { Button } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

function page({ params }: { params: { product_id: number } }) {
	const router = useRouter();

	const [selectedQuantity, setSelectedQuantity] = useState(1);

	const { isLoading, error, data } = useQuery({
		queryKey: ["stuff"],
		queryFn: () => getProduct(params.product_id),
	});

	async function addItemToShoppingCart() {
		const session = await getSession();

		if (session) {
			await addToShoppingCart(params.product_id, selectedQuantity);
		} else {
			router.push("/signin");
		}
	}

	async function addItemToWishlist() {
		const session = await getSession();

		if (session) {
			await addToWishlist(params.product_id, selectedQuantity);
		} else {
			router.push("/signin");
		}
	}

	return (
		<>
			<TopNavbar />
			<main className="flex flex-col min-h-screen py-20">
				<div className="flex w-full">
					<div
						className="flex flex-col justify-center items-center text-center border border-blue-500"
						style={{ flexGrow: 0.4, minHeight: "500px" }}
					>
						<div
							className="relative flex justify-center items-center border border-blue-500 w-full object-contain"
							style={{ flexGrow: 0.85 }}
						>
							<Image
								src={data?.img_src || ""}
								alt="Product Image"
								fill={true}
							></Image>
						</div>
						<div
							className="flex justify-center items-center border border-blue-500 w-full"
							style={{ flexGrow: 0.15 }}
						>
							IMAGE SELECTOR
						</div>
					</div>
					<div
						className="flex flex-col gap-y-8 items-center text-center border border-blue-500"
						style={{ flexGrow: 0.6 }}
					>
						<p className="font-bold text-xl">{data?.product_name}</p>
						<p className="text-large">${data?.base_price}</p>
						<p className="mb-32">{data?.description}</p>
						<div className="flex flex-col mb-32 gap-4">
							<Button color="primary" onClick={addItemToShoppingCart}>
								ADD TO CART
							</Button>
							<Button color="secondary" onClick={addItemToWishlist}>
								ADD TO WISHLIST
							</Button>
							<p>Quantity: 1</p>
						</div>
						<p className="mb-40">SPECIFICATIONS</p>
					</div>
				</div>
				<div className="flex justify-center items-center text-center border border-blue-500 h-32">
					REVIEWS
				</div>
				<div className="flex justify-center items-center text-center border border-blue-500 h-96">
					WAREHOUSE MAP
				</div>
				<div className="flex justify-center items-center text-center border border-blue-500 h-60">
					ALSO LIKE THIS PRODUCT
				</div>
			</main>
		</>
	);
}

export default page;
