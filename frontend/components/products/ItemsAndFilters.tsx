"use client";

import React, { useCallback, useEffect, useState } from "react";
import { ItemGrid } from "./ItemGrid";
import { FiltersType } from "@/api/filters.types";
import { Filters } from "./Filters";

type ItemsAndFiltersProps = {
  categoryName?: string;
  productName?: string;
};

// Displays both the filters that the user can set, and the grid of products that match those filters
// Takes in a category, and/or a product name that is also used to further filter the products
export function ItemsAndFilters({
  categoryName,
  productName,
}: ItemsAndFiltersProps) {
  const [curFilters, setCurFilters] = useState<FiltersType>({
    tags: categoryName ? [categoryName] : undefined,
    product_name: productName,
  });

  // Updates the curFilters state with all the given information
  const updateFilters = useCallback(
    (newFilters: FiltersType) => {
      if (newFilters.tags) {
        let { tags, ...rest } = newFilters;
        if (categoryName) tags.push(categoryName);

        setCurFilters({ ...rest, product_name: productName, tags: tags });
      } else {
        setCurFilters({
          ...newFilters,
          product_name: productName,
          tags: categoryName ? [categoryName] : undefined,
        });
      }
    },
    [categoryName, productName],
  );

  // Updates the current filters whenever any props change
  useEffect(() => {
    updateFilters({});
  }, [categoryName, productName, updateFilters]);

  return (
    <div className="flex flex-1 w-full mb-10 mt-8">
      <Filters onFiltersSave={updateFilters} />
      <ItemGrid filters={curFilters} />
    </div>
  );
}
