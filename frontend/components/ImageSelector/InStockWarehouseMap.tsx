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
    <div className="w-full h-full">
      <WarehouseMap data={data} />
    </div>
  );
}
