"use client";

import { createProductListing } from "@/api/product";
import { ProductListingCreation } from "@/api/product.types";
import { Button, Input, Textarea } from "@nextui-org/react";
import React, { useState } from "react";
import { WarehousesInput } from "./WarehousesInput";
import { AdditionalImgInput } from "./AdditionalImgInput";
import TagsInput from "./TagsInput";
import dynamic from "next/dynamic";
const WarehouseMap = dynamic(() => import("./WarehouseMap"), {
  loading: () => null,
  ssr: false,
});

export function CreateListingForm() {
  const [formData, setFormData] = useState<ProductListingCreation>({
    product_name: "",
    product_description: "",
    base_price: 0,
    current_price: 0,
    product_tags: [],
    main_product_img_file: null,
    additional_product_img_files: [],
    warehouse_ids: [],
    quantities: [],
  });

  // error checks, then submits the form
  // TODO: error check base_price >= current_price
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formData);

    createProductListing(formData);
  };

  // updates a specific attribute in the user's address whenever they change an input
  const handleInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { type } = event.target;

    if (type === "file") {
      handleFileInputChange(event as React.ChangeEvent<HTMLInputElement>);
    } else {
      handleTextInputChange(event);
    }
  };

  // handles any changes in files that the user input
  const handleFileInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;

    const file = files?.[0];

    // Check if the name matches the pattern additional_img_x
    const isAdditionalImg = name.match(/^additional_img_(\d+)$/);

    // If matches above regex, then sets the appropriate index in the additional_product_img to the file data
    if (isAdditionalImg && file) {
      const index = parseInt(isAdditionalImg[1], 10);
      const newArray = [...formData.additional_product_img_files];
      newArray[index - 1] = file;
      setFormData({ ...formData, additional_product_img_files: newArray });
    }
    // If no match, just set the appropriate attribute as the file data
    else {
      setFormData({ ...formData, [name]: file });
    }
  };

  // handles any change in text that the user inputs
  const handleTextInputChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = event.target;

    // Check if the name matches the pattern warehouse_id_x or product_quantity_x
    const isWarehouseId = name.match(/^warehouse_id_(\d+)$/);
    const isQuantity = name.match(/^product_quantity_(\d+)$/);

    // If matches above regex, then sets the appropriate index in the warehouse_ids to the value data
    if (isWarehouseId && value) {
      const index = parseInt(isWarehouseId[1], 10);
      const newArray = [...formData.warehouse_ids];
      newArray[index - 1] = Number.parseInt(value);
      setFormData({ ...formData, warehouse_ids: newArray });
    }
    // If matches above regex, then sets the appropriate index in the quantities to the value data
    else if (isQuantity && value) {
      const index = parseInt(isQuantity[1], 10);
      const newArray = [...formData.quantities];
      newArray[index - 1] = Number.parseInt(value);
      setFormData({ ...formData, quantities: newArray });
    }
    // default option: sets the form attribute to the value
    else {
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
      <div className="flex flex-col mb-4">
        <TagsInput
          handleInputChange={(value) => {
            setFormData({ ...formData, product_tags: value });
          }}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label
          className="text-sm pb-[6px] hover:cursor-pointer"
          htmlFor="main_product_img_file"
          aria-required
        >
          Product Main Image <span className="text-red-500">*</span>
        </label>
        <input
          className="text-sm hover:cursor-pointer"
          id="main_product_img_file"
          name="main_product_img_file"
          type="file"
          accept="image/jpeg"
          required
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-col mt-2 mb-4">
        <AdditionalImgInput
          handleInputChange={handleInputChange}
          onAmountDecrease={(curAmount) => {
            const newArray = [...formData.additional_product_img_files].slice(
              0,
              curAmount,
            );
            setFormData({
              ...formData,
              additional_product_img_files: newArray,
            });
          }}
        />
      </div>
      <div className="flex flex-col mt-2 mb-4">
        <div className="h-96 mb-16">
          <WarehouseMap />
        </div>
        <WarehousesInput
          handleInputChange={handleInputChange}
          onAmountDecrease={(curAmount) => {
            const newWarehouseIdArray = [...formData.warehouse_ids].slice(
              0,
              curAmount,
            );
            const newQuantitiesArray = [...formData.quantities].slice(
              0,
              curAmount,
            );
            setFormData({
              ...formData,
              warehouse_ids: newWarehouseIdArray,
              quantities: newQuantitiesArray,
            });
          }}
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
