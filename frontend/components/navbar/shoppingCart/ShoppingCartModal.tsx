"use client";

import React from "react";
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	Button,
	useDisclosure,
	Badge,
} from "@nextui-org/react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getShoppingCartProducts } from "@/api/shoppingCart";
import { ShoppingCartItem } from "./ShoppingCartItem";
import { useRouter } from "next/navigation";
import { removeFromShoppingCart } from "@/api/shoppingCart";

export function ShoppingCartModal() {
	const router = useRouter();

	const { isLoading, error, data, refetch } = useQuery({
		queryKey: ["Shopping Cart"],
		queryFn: getShoppingCartProducts,
	});

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

	const removeItemMutation = useMutation({
		mutationFn: removeFromShoppingCart,
		onSuccess: () => refetch(),
	});

	return (
		<>
			<div onClick={onOpen} className="cursor-pointer pt-3">
				<Badge color="danger" content={data?.length} shape="circle">
					<ShoppingCartIcon />
				</Badge>
			</div>
			<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">
								Shopping Cart
							</ModalHeader>
							<ModalBody className="overflow-y-auto max-h-[80vh] min-h-[80vh]">
								{data?.map((item) => (
									<div key={item.product.productId}>
										<ShoppingCartItem
											item={item}
											onItemRemove={removeItemMutation.mutate}
										/>
									</div>
								))}
							</ModalBody>
							<ModalFooter>
								<Button color="default" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button
									color="primary"
									onPress={() => router.push("/checkout")}
								>
									Check Out
								</Button>
							</ModalFooter>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
}
