"use client";

import { getBecomeVendorRequests } from "@/api/user";
import { Pagination } from "@nextui-org/react";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { VendorRequestCard } from "./BecomeVendorRequestCard";

const itemsPerPage = 10;

export function VendorRequests() {
  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["Vendor Requests"],
    queryFn: getBecomeVendorRequests,      
    
  });

  const [currentPage, setCurrentPage] = useState(1);

  const totalPaginationPages = data ? Math.ceil(data.length / itemsPerPage) : 1;

  // Calculate start and end index based on current page and items per page
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const onPaginationChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className="flex flex-col flex-wrap justify-items-center items-center">
        <h1 className="text-2xl mb-4">Requests to become a Vendor</h1>
        {data &&
          data.slice(startIndex, endIndex).map((item, index) => (
            <div key={index} className="w-full mb-2">
              <VendorRequestCard request={item} refetch={refetch} />
            </div>
          ))}
      </div>
      <div className="flex justify-center items-center text-center mt-8">
        <Pagination
          showControls
          total={totalPaginationPages}
          initialPage={1}
          onChange={onPaginationChange}
        />
      </div>
    </div>
  );
}
