import React from "react";
import { VisibilityContext } from "react-horizontal-scrolling-menu";
import { AiOutlineArrowRight } from "react-icons/ai";
function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);
  if (isLastItemVisible) {
    return <></>;
  }
  return (
    <AiOutlineArrowRight
      onClick={() => scrollNext()}
      className="mt-2"
      style={{ cursor: "pointer" }}
    />
  );
}

export default RightArrow;
