// documentation for ScrollMenu at https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu?tab=readme-ov-file
"use client";

import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";

import "./hideScrollbar.css";
import { ItemCard } from "../ItemCard";
import { ItemCardSkeleton } from "../ItemCardSkeleton";
import { Product } from "@/api/product.types";
import { useQuery } from "@tanstack/react-query";
import { getNewProducts, getSaleProducts } from "@/api/product";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type ItemScrollMenuProps = {
  header: string;
  queryFunctionKey: QueryFunctionKeys;
};

// using string queryfunctionkeys instead of passing the actual function to this component to keep the possibility of the parent
// component being a server component, cannot pass functions from server component to client component
type QueryFunctionKeys = "getSaleProducts" | "getNewProducts";
const queryFunctions: {
  [key: string]: () => Promise<Product[]>;
} = {
  getSaleProducts: () => getSaleProducts(20),
  getNewProducts: () => getNewProducts(20),
};

export function ItemScrollMenu({
  header,
  queryFunctionKey,
}: ItemScrollMenuProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: [queryFunctionKey],
    queryFn: queryFunctions[queryFunctionKey],
  });

  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <>
      <div className="w-full">
        <h3 className="text-large font-bold uppercase">{header}</h3>
        <div>
          <ScrollMenu
            separatorClassName="mx-1"
            scrollContainerClassName="p-3"
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
          >
            {!(isLoading || error) && data
              ? data.map((item) => (
                  <div key={item.product_id}>
                    <ItemCard
                      isLoading={isLoading}
                      error={error}
                      product={item}
                    />
                  </div>
                ))
              : Array.from({ length: 6 }, (_, index) => (
                  <div key={index}>
                    <ItemCardSkeleton />
                  </div>
                ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollNext();
  } else if (ev.deltaY > 0) {
    apiObj.scrollPrev();
  }
}
