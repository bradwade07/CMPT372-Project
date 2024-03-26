"use client";

import { Button, Input, Textarea } from "@nextui-org/react";
import React from "react";

export function CreateListingForm() {
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(event);
  };

  return (
    <form className="flex flex-col w-1/2" onSubmit={handleSubmit}>
      <Input
        className="mb-4"
        label="Product Name"
        placeholder="Enter Product Name..."
        labelPlacement="outside"
        isRequired
      />
      <Textarea
        className="mb-4"
        label="Product Description"
        placeholder="Enter Product Description..."
        labelPlacement="outside"
        isRequired
      />
      <Button
        className="mt-4 self-center sm:w-40 w-fit"
        type="submit"
        color="primary"
      >
        Submit
      </Button>
    </form>
  );
}
