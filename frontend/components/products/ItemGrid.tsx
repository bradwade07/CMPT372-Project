"use client";

import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ItemCard } from "./ItemCard";
import { ItemCardSkeleton } from "./ItemCardSkeleton";
import { getFilteredProducts } from "@/api/product";
import { Pagination } from "@nextui-org/react";
import { FiltersType } from "@/api/filters.types";

type ItemGridProps = {
  filters: FiltersType;
};

export function ItemGrid({ filters }: ItemGridProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: [filters],
    queryFn: () => getFilteredProducts(filters),
  });

  const totalPaginationPages = 10;
  const onPaginationChange = (page: number) => {
    console.log(`pagination change to ${page}`);
  };

  return (
    <div className="flex flex-col w-full">
      <div className="flex flex-wrap gap-y-8 flex-1 justify-items-center items-center">
        {!(isLoading || error) && data
          ? data.map((item) => (
              <div key={item.product_id} className="mx-auto">
                <ItemCard isLoading={isLoading} error={error} product={item} />
              </div>
            ))
          : Array.from({ length: 10 }, (_, index) => (
              <div key={index} className="mx-auto">
                <ItemCardSkeleton />
              </div>
            ))}
      </div>
      <div className="flex justify-center items-center text-center mt-8">
        <Pagination
          showControls
          total={totalPaginationPages}
          initialPage={1}
          onChange={(page: number) => {
            onPaginationChange(page);
            window.scrollTo({ top: 0, behavior: "instant" });
          }}
        />
      </div>
    </div>
  );
}
