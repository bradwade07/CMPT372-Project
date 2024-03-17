"use client";

import React from "react";
import { Filters } from "./Filters";
import { ItemGrid } from "./ItemGrid";

type ItemsAndFiltersProps = {
  categoryName: string;
};

export function ItemsAndFilters({ categoryName }: ItemsAndFiltersProps) {
  return (
    <div className="flex flex-1 w-full mb-10 mt-8">
      <Filters />
      <ItemGrid
        queryFunctionKey={"getFilteredProducts"}
        filters={[categoryName]}
      />
    </div>
  );
}
