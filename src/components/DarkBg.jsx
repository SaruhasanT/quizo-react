import React from "react";

const DarkBg = ({ onClick }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#000000",
        opacity: 0.6,
        zIndex: 100,
      }}
      onClick={onClick}
    ></div>
  );
};

export default DarkBg;
