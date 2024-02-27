// documentation for ScrollMenu at https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu?tab=readme-ov-file
"use client";

import React, { useEffect, useState } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";

import "./hideScrollbar.css";
import ItemCard from "@/components/ItemCard/ItemCard";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

// TODO: decide what to do about contents: fetch function uses a body to specify what it wants or separate fetch functions
type ItemScrollMenuProps = {
  header: string;
  contents?: { productId: number }[];
};

function ItemScrollMenu({ header, contents }: ItemScrollMenuProps) {
  const [items, setItems] = useState([
    { productId: 1 },
    { productId: 2 },
    { productId: 3 },
    { productId: 4 },
    { productId: 5 },
    { productId: 6 },
    { productId: 7 },
    { productId: 8 },
    { productId: 9 },
    { productId: 10 },
  ]);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

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
                <ItemCard productId={item.productId} />
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
