// documentation for ScrollMenu at https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu?tab=readme-ov-file

"use client"

import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import "react-horizontal-scrolling-menu/dist/styles.css";

import { LeftArrow, RightArrow } from "./arrows";
import usePreventBodyScroll from "./usePreventBodyScroll";

import "./hideScrollbar.css";
import ItemCard from "@/components/ItemCard/ItemCard";
import Link from "next/link";

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

const elemPrefix = "test";
const getId = (index: number) => `${elemPrefix}${index}`;

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, index) => ({ id: getId(index) }));

function App() {
  const [items] = React.useState(getItems);
  const { disableScroll, enableScroll } = usePreventBodyScroll();

  return (
    <>
      <div className="example" style={{ paddingTop: "100px" }}>
        <div onMouseEnter={disableScroll} onMouseLeave={enableScroll}>
          <ScrollMenu
            Header={<div className="flex justify-center mb-4">HEADER</div>}
            Footer={<div className="flex justify-center mt-4">FOOTER</div>}
            LeftArrow={LeftArrow}
            RightArrow={RightArrow}
            onWheel={onWheel}
          >
            {items.map(({ id }) => (
              <ItemCard
                itemId={id} // NOTE: itemId is required for track items
                key={id}
              />
            ))}
          </ScrollMenu>
        </div>
      </div>
      <Link className="flex justify-center text-blue-400 mt-4" href={"/"}>HOME</Link>
    </>
  );
}
export default App;

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