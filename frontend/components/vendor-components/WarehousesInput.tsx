"use client";

import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { useQuery } from "@tanstack/react-query";
import { getAllWarehouses } from "@/api/warehouse";

type WarehousesInputProps = {
  handleInputChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ): void;
  onAmountDecrease(curAmount: number): void;
};

export function WarehousesInput({
  handleInputChange,
  onAmountDecrease,
}: WarehousesInputProps) {
  const MAX_WAREHOUSES = 5;

  const { isLoading, error, data } = useQuery({
    queryKey: ["All Warehouses"],
    queryFn: getAllWarehouses,
  });

  const [numOfWarehouses, setNumOfWarehouses] = useState(1);

  // TODO: error check that each warehouseid is unique
  const renderWarehouseQuantityInput = (): React.JSX.Element[] => {
    const elements = [];
    for (let i = 0; i < numOfWarehouses; i++) {
      elements.push(
        <div className="flex flex-col w-1/2 mb-2" key={i}>
          <Select
            className="mb-4"
            label={`Select Warehouse #${i + 1}`}
            labelPlacement="outside"
            name={`warehouse_id_${i + 1}`}
            placeholder="Select warehouse ID"
            onChange={handleInputChange}
            isRequired
            disabled={!data}
          >
            {data ? (
              data.map((item) => (
                <SelectItem
                  key={item.warehouse_id}
                  value={item.warehouse_id}
                  textValue={item.warehouse_id.toString()}
                >
                  {item.warehouse_id}
                </SelectItem>
              ))
            ) : (
              <SelectItem key="null" textValue="null" aria-disabled>
                Loading
              </SelectItem>
            )}
          </Select>
          <Input
            className="mb-4"
            type="number"
            label="Product Quantity (Non-negative Integer)"
            labelPlacement="outside"
            name={`product_quantity_${i + 1}`}
            placeholder="0"
            pattern="^[1-9]\d*$"
            step={1}
            min={1}
            isRequired
            onChange={handleInputChange}
          />
        </div>,
      );
    }
    return elements;
  };

  return (
    <>
      <div className="flex justify-between mb-2">
        <label className="text-lg pb-[6px]">
          Warehouses (max. {MAX_WAREHOUSES})
        </label>
        <div className="flex text-center align-middle justify-center space-x-2">
          <Button
            type="button"
            className={`flex text-3xl bg-green-500 ${numOfWarehouses >= MAX_WAREHOUSES && "invisible pointer-events-none"}`}
            radius="full"
            isIconOnly
            onClick={() => setNumOfWarehouses(numOfWarehouses + 1)}
          >
            <AddIcon />
          </Button>
          <Button
            type="button"
            className={`flex text-3xl bg-red-500 ${numOfWarehouses <= 1 && "invisible pointer-events-none"}`}
            radius="full"
            isIconOnly
            onClick={() => {
              onAmountDecrease(numOfWarehouses - 1);
              setNumOfWarehouses(numOfWarehouses - 1);
            }}
          >
            <RemoveIcon />
          </Button>
        </div>
      </div>
      {renderWarehouseQuantityInput()}
      {/* TODO: implement warehouse map */}
    </>
  );
}
