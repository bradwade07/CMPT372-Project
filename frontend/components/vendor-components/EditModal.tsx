"use client"

import React, { useEffect, useState } from "react"
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
  Textarea
} from "@nextui-org/react"
import { useQuery } from "@tanstack/react-query"
import { getProduct, updateProductPrice } from "@/api/product"
import {Image} from "@nextui-org/react"

type EditModalProps = {
    open: boolean
    onEditClose: () => void
    productId: number
}

export function EditModal({open, onEditClose, productId}: EditModalProps) {
    //query the product
    const { isLoading, error, data } = useQuery({
        queryKey: ["Product", productId],
        queryFn: () => getProduct(productId),
        })

    //standard modal from nextui documentation/wishlistModal
    const { isOpen, onOpen, onOpenChange } = useDisclosure()

      useEffect(() => {
        if (open) {
          onOpen()
        }
      }, [open, onOpen])
    
      useEffect(() => {
        if (!isOpen) {
          onEditClose()
        }
      }, [isOpen, onEditClose])


      //new price value
    const [newPrice, setNewPrice] = useState<number>(0)
    const [basePrice, setBasePrice] = useState<number>(0);

    const handleSubmit = async () => {

        await updateProductPrice(productId, newPrice);
      };

      const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        if (/^\d*$/.test(value) &&parseInt(value) <= basePrice ) {
            setNewPrice(parseInt(value));
        } else if(parseInt(value) > basePrice){
            setNewPrice(basePrice)
        } else {
            setNewPrice(0);
        }
      }

      useEffect(() => {
        if(data){
            setBasePrice(data.base_price);
        }
      }, []);

    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) =>(
                    <>
                    <ModalHeader>
                        <p>{data?.product_name}</p>
                    </ModalHeader>
                    <ModalBody className="overflow-y-auto">                    
                        <p><ul>
                            <li><Image
                                    shadow="sm"
                                    radius="lg"
                                    alt={data?.product_name}
                                    className=" object-cover h-[140px] w-[140px]"
                                    src={`data:image/jpeg;base64, ${data?.product_main_img}`}
                                    /></li>
                                <li><p className="text-default-500">base price: ${data?.base_price.toFixed(2)}</p></li>
                                <li><p className="text-default-500">current price:  ${data?.current_price.toFixed(2)}</p></li>
                                <li><p className="text-default-500">new price (must be equal to or less than base price): </p>
                                <input
                                    className="rounded-md max-w-12 bg-slate-100 ring-2 ring-blue-500"
                                    type="number"
                                    
                                    min="0"
                                    max = {data?.base_price}
                                    step="1"
                                    value={newPrice === 0 ? '0' : newPrice.toString()}
                                    onChange={handlePriceChange}
                                    />
                                </li>
                            </ul></p>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="default" variant="light" onPress={onClose}>
                            Close
                        </Button>
                        <Button color="warning" variant="light" onPress={()=>{handleSubmit().then(onClose)}}>
                            Save
                        </Button>
                    </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}