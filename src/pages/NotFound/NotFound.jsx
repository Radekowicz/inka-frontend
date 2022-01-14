import React from "react";
import UndrawNotFound from "../../images/undraw_page_not_found.svg";

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <img src={UndrawNotFound} alt="UndrawNotFound" />
    </div>
  );
}
