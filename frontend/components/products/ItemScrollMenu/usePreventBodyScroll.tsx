// Code adapted from: https://github.com/asmyshlyaev177/react-horizontal-scrolling-menu?tab=readme-ov-file
import React from "react";

// These functions used to prevent the entire page from being scrolled by the mouse wheel when activated

const preventDefault = (ev: Event) => {
  if (ev.preventDefault) {
    ev.preventDefault();
  }
  ev.returnValue = false;
};

const enableBodyScroll = () => {
  document && document.removeEventListener("wheel", preventDefault, false);
};
const disableBodyScroll = () => {
  document &&
    document.addEventListener("wheel", preventDefault, {
      passive: false,
    });
};

function usePreventBodyScroll() {
  const [hidden, setHidden] = React.useState(false);

  React.useEffect(() => {
    hidden ? disableBodyScroll() : enableBodyScroll();

    return enableBodyScroll;
  }, [hidden]);

  const disableScroll = React.useCallback(() => setHidden(true), []);
  const enableScroll = React.useCallback(() => setHidden(false), []);
  return { disableScroll, enableScroll };
}

export default usePreventBodyScroll;
