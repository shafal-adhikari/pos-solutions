import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineArrowLeft } from "react-icons/ai";

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);
  if (isFirstItemVisible) {
    return <></>;
  }
  return (
    <AiOutlineArrowLeft
      onClick={() => scrollPrev()}
      className="mt-2"
      style={{ cursor: "pointer" }}
    />
  );
}

export default LeftArrow;
