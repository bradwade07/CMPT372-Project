// documentation for ScrollMenu at https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu?tab=readme-ov-file
"use client";

import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";

import "./hideScrollbar.css";
import ItemCard from "@/components/ItemCard/ItemCard";
import { Product } from "@/api/product.types";
import { useQuery } from "@tanstack/react-query";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

type ItemScrollMenuProps = {
  header: string;
  getContents: () => Promise<Product[]>;
};

function ItemScrollMenu({ header, getContents }: ItemScrollMenuProps) {
  const { isLoading, error, data } = useQuery({
    queryKey: ["products", getContents],
    queryFn: getContents,
  });

  const [items, setItems] = useState<Product[]>([]);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  useEffect(() => {
    if (data) {
      setItems(data);
    }
  }, [data]);

  return (
    <>
      <div className="w-full">
        <h3 className="text-large font-bold uppercase">{header}</h3>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            separatorClassName="mx-1"
            scrollContainerClassName="p-3"
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {items.map((item) => (
              <div key={item.productId}>
                <ItemCard isLoading={isLoading} error={error} product={item} />
              </div>
            ))}
          </ScrollMenu>
        </div>
      </div>
    </>
  );
}
export default ItemScrollMenu;

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
