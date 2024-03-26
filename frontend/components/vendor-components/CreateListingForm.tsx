"use client";

import { createProductListing } from "@/api/product";
import { ProductListing } from "@/api/product.types";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";

export function CreateListingForm() {
  const [formData, setFormData] = useState<ProductListing>({
    product_name: "",
    main_product_img: null,
    base_price: 0,
    current_price: 0,
    product_description: "",
    additional_product_img: [],
  });

  // error checks, then submits the form
  // TODO: error check base_price >= current_price
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);

    createProductListing(formData);
  };

  // updates a specific attribute in the user's address whenever they type something
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = event.target;

    // If it's a file input, set the file in state
    if (type === "file") {
      const file = (event.target as HTMLInputElement).files?.[0];
      setFormData({ ...formData, [name]: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  return (
    <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
      <Input
        className="mb-4"
        label="Product Name"
        labelPlacement="outside"
        name="product_name"
        placeholder="Enter Product Name..."
        maxLength={255}
        isRequired
        onChange={handleInputChange}
      />
      <Textarea
        className="mb-4"
        label="Product Description"
        labelPlacement="outside"
        name="product_description"
        placeholder="Enter Product Description..."
        maxLength={255}
        isRequired
        onChange={handleInputChange}
      />
      <Input
        className="mb-4"
        type="number"
        label="Product Base Price"
        labelPlacement="outside"
        name="base_price"
        placeholder="0"
        pattern="^\d*(\.\d{0,2})?$"
        step={0.01}
        min={0}
        isRequired
        onChange={handleInputChange}
      />
      <Input
        className="mb-4"
        type="number"
        label="Product Current Price"
        labelPlacement="outside"
        name="current_price"
        description={
          <>
            <p>
              Enter a lower amount than the base price for the item to be on
              sale, otherwise enter the same amount.
            </p>
            <p>
              If left blank, value will be filled automatically with the base
              price.
            </p>
          </>
        }
        placeholder="0"
        pattern="^\d*(\.\d{0,2})?$"
        step={0.01}
        min={0}
        onChange={handleInputChange}
      />
      <div className="flex flex-col w-fit">
        <label
          className="text-sm pb-[6px] hover:cursor-pointer"
          htmlFor="main_product_img"
          aria-required
        >
          Product Main Image <span className="text-red-500">*</span>
        </label>
        <input
          className="text-sm hover:cursor-pointer"
          id="main_product_img"
          name="main_product_img"
          type="file"
          accept="image/png, image/jpeg"
          required
          onChange={handleInputChange}
        />
      </div>
      <Button
        className="mt-8 self-center sm:w-40 w-fit"
        type="submit"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
}
