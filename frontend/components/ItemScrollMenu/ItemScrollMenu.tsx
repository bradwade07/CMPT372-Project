// documentation for ScrollMenu at https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu?tab=readme-ov-file
"use client";

import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";

import "./hideScrollbar.css";
import ItemCard from "@/components/ItemCard/ItemCard";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

// TODO: swap type of contents to an actual type
type ItemScrollMenuProps = {
  header: string;
  contents: { id: string }[];
};

function ItemScrollMenu({ header, contents }: ItemScrollMenuProps) {
  const [items] = React.useState(contents);
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
              <div key={item.id}>
                <ItemCard productId={item.id} />
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
