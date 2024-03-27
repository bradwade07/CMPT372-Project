"use client";

import { createProductListing } from "@/api/product";
import { ProductListing } from "@/api/product.types";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

export function CreateListingForm() {
  const MAX_ADDITIONAL_IMG = 10;

  const [numOfAdditionalImg, setNumOfAdditionalImg] = useState(0);
  const [formData, setFormData] = useState<ProductListing>({
    product_name: "",
    product_description: "",
    base_price: 0,
    current_price: 0,
    main_product_img: null,
    additional_product_img: [],
  });

  const renderAdditonalImgInput = () => {
    const elements = [];
    for (let i = 0; i < numOfAdditionalImg; i++) {
      elements.push(
        <div className="flex flex-col w-fit mb-2" key={i}>
          <label
            className="text-sm pb-[6px] hover:cursor-pointer"
            htmlFor={`additional_img_${i + 1}`}
            aria-required
          >
            Additional Product Image {i + 1}
            <span className="text-red-500">*</span>
          </label>
          <input
            className="text-sm hover:cursor-pointer"
            id={`additional_img_${i + 1}`}
            name={`additional_img_${i + 1}`}
            type="file"
            accept="image/png, image/jpeg"
            required
            onChange={handleInputChange}
          />
        </div>,
      );
    }
    return elements;
  };

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

      // Check if the name matches the pattern additional_img_x
      const additionalImgPattern = /^additional_img_(\d+)$/;
      const match = name.match(additionalImgPattern);

      // If matches above regex, then sets the appropriate index in the additional_product_img to the file data
      if (match && file) {
        const index = parseInt(match[1], 10);
        const newArray = [...formData.additional_product_img];
        newArray[index - 1] = file;
        setFormData({ ...formData, additional_product_img: newArray });
      }
      // If no match, just set the appropriate attribute as the file data
      else {
        setFormData({ ...formData, [name]: file });
      }
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
      <div className="flex flex-col w-fit mb-4">
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
      <div className="flex flex-col mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-lg pb-[6px]">
            Additional Product Images (max. {MAX_ADDITIONAL_IMG})
          </label>
          <div className="flex text-center align-middle justify-center space-x-2">
            <Button
              type="button"
              className={`flex text-3xl bg-green-500 ${numOfAdditionalImg >= MAX_ADDITIONAL_IMG && "invisible pointer-events-none"}`}
              radius="full"
              isIconOnly
              onClick={() => setNumOfAdditionalImg(numOfAdditionalImg + 1)}
            >
              <AddIcon />
            </Button>
            <Button
              type="button"
              className={`flex text-3xl bg-red-500 ${numOfAdditionalImg <= 0 && "invisible pointer-events-none"}`}
              radius="full"
              isIconOnly
              onClick={() => {
                setNumOfAdditionalImg(numOfAdditionalImg - 1);
                const newArray = [...formData.additional_product_img].slice(
                  0,
                  numOfAdditionalImg - 1,
                );
                setFormData({ ...formData, additional_product_img: newArray });
              }}
            >
              <RemoveIcon />
            </Button>
          </div>
        </div>
        {renderAdditonalImgInput()}
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
