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
import { useQuery } from "@tanstack/react-query";
import { getShoppingCartProducts } from "@/api/product";
import ShoppingCartItem from "../ShoppingCartItem/ShoppingCartItem";

function ShoppingCartModal() {
	const { isLoading, error, data } = useQuery({
		queryKey: ["Shopping Cart"],
		queryFn: getShoppingCartProducts,
	});

	const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
							<ModalBody className="overflow-y-auto max-h-[80vh]">
								{data?.map((item) => <ShoppingCartItem item={item} />)}
							</ModalBody>
							<ModalFooter>
								<Button color="default" variant="light" onPress={onClose}>
									Close
								</Button>
								<Button color="primary" onPress={onClose}>
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

export default ShoppingCartModal;
