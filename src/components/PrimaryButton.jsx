import "../css/PrimaryButton.css";
import React from "react";
import { Button } from "@mui/material";

const PrimaryButton = ({ onClick, text, backgroundColor, width }) => {
  return (
    <Button
      variant="outlined"
      style={{
        width: width,
      }}
      className="primary-btn"
      onClick={onClick}
    >
      {text}
    </Button>
  );
};

export default PrimaryButton;
