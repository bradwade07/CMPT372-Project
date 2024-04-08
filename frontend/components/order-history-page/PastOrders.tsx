"use client";

import { getUserOrderHistory } from "@/api/product";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ProductEntry } from "./ProductEntry";

export function PastOrders() {
  const { data } = useQuery({
    queryKey: ["Order History"],
    queryFn: getUserOrderHistory,
  });

  return (
    <div className="mx-4">
      <div className="max-h-[80vh] overflow-y-auto px-2 mt-4">
        {data?.map((item, index) => (
          <div
            className="flex flex-col mx-auto mb-10 w-2/3"
            key={item.order_id}
          >
            <p className="text-center text-2xl">Order {index + 1}</p>
            {item.products.map((product) => (
              <span key={product.product_id}>
                <ProductEntry productEntry={product} />
              </span>
            ))}
            <p>
              Order Date:{" "}
              {new Date(item.order_date * 1000).toLocaleString("en-US", {
                timeZone: "America/Los_Angeles",
              })}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
