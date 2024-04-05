"use client";

import { Warehouse, WarehouseWithStock } from "@/api/warehouse.types";
import React from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
const WarehouseMap = dynamic(
  () => import("@/components/general/WarehouseMap"),
  {
    loading: () => null,
    ssr: false,
  },
);

type InStockWarehouseMap = {
  data: Warehouse[] | WarehouseWithStock[] | undefined;
};

export function InStockWarehouseMap({ data }: InStockWarehouseMap) {
  return (
    <div className="flex flex-col text-center gap-y-2 w-full h-full">
      <h3 className="text-xl">
        Map of warehouse locations that has this product in stock
      </h3>
      <p>Please click on a pin to see the warehouse ID</p>
      <WarehouseMap data={data} />
    </div>
  );
}
