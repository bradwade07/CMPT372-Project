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

// Displays a shopping cart icon that, when clicked, displays a modal containing all the items in a user's shopping cart
// user can click a button in the modal to go to the checkout page
export function ShoppingCartModal() {
  const router = useRouter();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["Shopping Cart"],
    queryFn: getShoppingCartProducts,
  });

  // this hook used to control when the shopping cart modal is opened or closed
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // mutation used to force a refetch of the shopping cart contents when an item is removed
  const removeItemMutation = useMutation({
    mutationFn: removeFromShoppingCart,
    onSuccess: () => refetch(),
  });

  return (
    <>
      <div onClick={onOpen} className="cursor-pointer pt-3">
        <Badge color="danger" content={data ? data.length : 0} shape="circle">
          <ShoppingCartIcon />
        </Badge>
      </div>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        className="max-h-[85vh] min-h-[85vh]"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Shopping Cart
              </ModalHeader>
              <ModalBody className="overflow-y-auto">
                {data?.map((item) => (
                  <div key={item.product_id}>
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
                  className="cursor-pointer"
                  disabled={data && data.length > 0}
                  onPress={() => {
                    router.push("/checkout");
                  }}
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
