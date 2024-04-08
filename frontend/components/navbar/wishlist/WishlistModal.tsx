"use client";

import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { WishlistItem } from "./WishlistItem";
import { getWishlistProducts, removeFromWishlist } from "@/api/wishlist";

type WishlistModalProps = {
  open: boolean;
  onWishlistClose: () => void;
};

// Displays a modal that contains all the items in a user's wishlist, modal opening and closing are controlled by the component's props
export function WishlistModal({ open, onWishlistClose }: WishlistModalProps) {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["Wishlist"],
    queryFn: getWishlistProducts,
  });

  // this hook used to control when the wishlist modal is opened or closed
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // mutation used to force a refetch of the wishlist contents when an item is removed
  const removeItemMutation = useMutation({
    mutationFn: removeFromWishlist,
    onSuccess: () => refetch(),
  });

  // opens the modal when the open prop is set to true
  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open, onOpen]);

  // closes the modal when the user exits out of it
  useEffect(() => {
    if (!isOpen) {
      onWishlistClose();
    }
  }, [isOpen, onWishlistClose]);

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className="max-h-[85vh] min-h-[85vh]"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <p>My Wishlist</p>
              <p className="text-sm text-bold">
                Click on an item to go to it&apos;s page!
              </p>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              {data?.map((item) => (
                <div key={item.product_id}>
                  <WishlistItem
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
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
