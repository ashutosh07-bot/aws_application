import { Box, Button } from "@mui/material";
import React from "react";

const CustomButton = ({ variant, buttonText, onClick, disabled }) => {
  return (
    <Box sx={{ display: "flex", justifyContent: "end", marginBottom: "20px" }}>
      <Button variant={variant} onClick={onClick} disabled={disabled}>
        {buttonText}
      </Button>
    </Box>
  );
};

export default CustomButton;
