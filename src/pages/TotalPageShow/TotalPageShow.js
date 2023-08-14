import React from "react";

function TotalPageShow({ pageSize, total }) {
  return (
    <span className="me-4">
      {pageSize < total ? pageSize : total} out of {total}
    </span>
  );
}

export default TotalPageShow;
