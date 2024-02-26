import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";


import {
  VisibilityContext,
  publicApiType,
} from "react-horizontal-scrolling-menu";

export function LeftArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isFirstItemVisible = visibility.useIsVisible("first", true);

  return (
    <Arrow
      disabled={isFirstItemVisible}
      onClick={() => visibility.scrollPrev()}
    >
      <FaArrowCircleLeft size={50}/>
    </Arrow>
  );
}

export function RightArrow() {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  const isLastItemVisible = visibility.useIsVisible("last", false);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => visibility.scrollNext()}>
      <FaArrowCircleRight size={50}/>
    </Arrow>
  );
}

function Arrow({
  children,
  disabled,
  onClick,
}: {
  children: React.ReactNode;
  disabled: boolean;
  onClick: VoidFunction;
}) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        right: "1%",
        opacity: disabled ? "0" : "1",
        userSelect: "none",
      }}
    >
      {children}
    </button>
  );
}
