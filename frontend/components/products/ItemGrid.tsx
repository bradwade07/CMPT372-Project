"use client";

import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { ItemCard } from "./ItemCard";
import { ItemCardSkeleton } from "./ItemCardSkeleton";
import { getFilteredProducts } from "@/api/product";
import { Pagination } from "@nextui-org/react";
import { FiltersType } from "@/api/filters.types";

const itemsPerPage = 20;

type ItemGridProps = {
  filters: FiltersType;
};

// Displays a grid of products that match the given filters, uses pagination if there are too many
export function ItemGrid({ filters }: ItemGridProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: [filters],
    queryFn: () => getFilteredProducts(filters),
  });

  // controls which page its on
  const [currentPage, setCurrentPage] = useState(1);

  // the total number of pages there are
  const totalPaginationPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

  // calculate start and end index based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // changes the page
  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex flex-wrap gap-y-8 flex-1 justify-center align-middle">
        {!(isLoading || error) && data
          ? data.slice(startIndex, endIndex).map((item) => (
              <div key={item.product_id} className="mx-2">
                <ItemCard isLoading={isLoading} error={error} product={item} />
              </div>
            ))
          : Array.from({ length: itemsPerPage }, (_, index) => (
              <div key={index} className="mx-2">
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
