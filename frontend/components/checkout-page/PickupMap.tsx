"use client";

import { ShoppingCartEntry } from "@/api/product.types";
import { getWarehouse } from "@/api/warehouse";
import { Warehouse } from "@/api/warehouse.types";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const WarehouseMap = dynamic(
  () => import("@/components/general/WarehouseMap"),
  {
    loading: () => null,
    ssr: false,
  },
);

type PickupMapProps = {
  data: ShoppingCartEntry[] | undefined;
};

export default function PickupMap({ data }: PickupMapProps) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);

  useEffect(() => {
    let warehouseList: Warehouse[] = [];

    data?.forEach(async (item) => {
      if (item.delivery == false && item.warehouse_id) {
        if (
          !warehouseList.find((warehouse: Warehouse) => {
            return warehouse.warehouse_id == item.warehouse_id;
          })
        ) {
          const newWarehouse = await getWarehouse(item.warehouse_id);
          if (newWarehouse) warehouseList.push(newWarehouse);
        }
      }
    });

    setWarehouses(warehouseList);
  }, [data]);

  return (
    <div className="w-full h-full">
      <h3 className="text-lg">
        Map of warehouse locations you chose to pick up items at:
      </h3>
      <WarehouseMap data={warehouses} />
    </div>
  );
}
