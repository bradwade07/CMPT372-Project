"use client";

import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import { getProduct, updateProductPrice } from "@/api/product";
import { Image } from "@nextui-org/react";

type EditModalProps = {
  open: boolean;
  onEditClose: () => void;
  productId: number;
  basePrice: number;
  currentPrice: number;
};

export function EditModal({
  open,
  onEditClose,
  productId,
  basePrice,
  currentPrice,
}: EditModalProps) {
  //query the product
  const { isLoading, error, data } = useQuery({
    queryKey: ["Product", productId],
    queryFn: () => getProduct(productId),
  });

  //standard modal from nextui documentation/wishlistModal
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  useEffect(() => {
    if (open) {
      onOpen();
    }
  }, [open, onOpen]);

  useEffect(() => {
    if (!isOpen) {
      onEditClose();
    }
  }, [isOpen, onEditClose]);

  //new price value
  const [newPrice, setNewPrice] = useState<number>(currentPrice);

  const handleSubmit = async () => {
    await updateProductPrice(productId, newPrice);
  };

  //makes sure integer/valid values are inserted
  const handlePriceChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = event.target.value;
    if (Number(value) < 0) {
      setNewPrice(0);
    } else if (Number(value) > basePrice) {
      setNewPrice(basePrice);
    } else {
      setNewPrice(Number(value));
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>
              <p>{data?.product_name}</p>
            </ModalHeader>
            <ModalBody className="overflow-y-auto">
              <p>
                <ul>
                  <li>
                    <Image
                      shadow="sm"
                      radius="lg"
                      alt={data?.product_name}
                      className=" object-cover h-[140px] w-[140px]"
                      src={`data:image/jpeg;base64, ${data?.product_main_img}`}
                    />
                  </li>
                  <li>
                    <p className="text-default-500">
                      base price: ${data?.base_price.toFixed(2)}
                    </p>
                  </li>
                  <li>
                    <p className="text-default-500">
                      current price: ${data?.current_price.toFixed(2)}
                    </p>
                  </li>
                  <li>
                    <p className="text-default-500">
                      new price (must be equal to or less than base price):{" "}
                    </p>
                    <Input
                      className="rounded-md bg-slate-100 ring-2 ring-blue-500"
                      type="number"
                      min="0"
                      max={basePrice}
                      placeholder={basePrice.toString()}
                      step="1"
                      pattern="^\d*(\.\d{0,2})?$"
                      value={newPrice.toString()}
                      onChange={handlePriceChange}
                    />
                  </li>
                </ul>
              </p>
            </ModalBody>
            <ModalFooter>
              <Button color="default" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="warning"
                variant="light"
                onPress={() => {
                  handleSubmit().then(onClose);
                }}
              >
                Save
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}
