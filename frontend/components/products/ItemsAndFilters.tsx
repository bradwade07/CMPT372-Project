"use client";

import React from "react";
import { ItemGrid } from "./ItemGrid";
import { FiltersType } from "@/api/filters.types";
import { Filters } from "./Filters";

type ItemsAndFiltersProps = {
  categoryName?: string;
  productName?: string;
};

export function ItemsAndFilters({
  categoryName,
  productName,
}: ItemsAndFiltersProps) {
  // TODO: get filter values from Filters component and pass it to ItemGrid (or refactor so this component fetches instead of ItemGrid)
  let curFilters: FiltersType = {
    tags: categoryName ? [categoryName] : undefined,
    product_name: productName,
  };

  return (
    <div className="flex flex-1 w-full mb-10 mt-8">
      <Filters />
      <ItemGrid filters={curFilters} />
    </div>
  );
}
