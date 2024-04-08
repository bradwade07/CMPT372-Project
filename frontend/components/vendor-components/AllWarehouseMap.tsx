"use client";

import { getAllWarehouses } from "@/api/warehouse";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import dynamic from "next/dynamic";
const WarehouseMap = dynamic(
  () => import("@/components/general/WarehouseMap"),
  {
    loading: () => null,
    ssr: false,
  },
);

export default function AllWarehouseMap() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["Warehouses"],
    queryFn: getAllWarehouses,
  });

  return (
    <div className="w-full h-full">
      <h3 className="text-lg">
        Map of warehouse locations you can store your products at
      </h3>
      <p>Please click on a pin to see the warehouse ID</p>
      <WarehouseMap data={data} />
    </div>
  );
}
