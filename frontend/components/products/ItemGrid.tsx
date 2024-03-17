"use client";

import { Product } from "@/api/product.types";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ItemCard } from "./ItemCard";
import { ItemCardSkeleton } from "./ItemCardSkeleton";
import { getFilteredProducts } from "@/api/product";
import { Pagination } from "@nextui-org/react";

type ItemGridProps = {
  queryFunctionKey: QueryFunctionKeys;
  filters: string[];
};

// using string queryfunctionkeys instead of passing the actual function to this component to keep the possibility of the parent
// component being a server component, cannot pass functions from server component to client component
type QueryFunctionKeys = "getFilteredProducts";
const queryFunctions: {
  [key: string]: (filters: string[]) => Promise<Product[]>;
} = {
  getFilteredProducts: getFilteredProducts,
};

export function ItemGrid({ queryFunctionKey, filters }: ItemGridProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: [filters, queryFunctionKey],
    queryFn: () => queryFunctions[queryFunctionKey](filters),
  });

  const totalPaginationPages = 10;
  const onPaginationChange = (page: number) => {
    console.log(`pagination change to ${page}`);
  };

  return (
    <div className="flex flex-col w-fit">
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
