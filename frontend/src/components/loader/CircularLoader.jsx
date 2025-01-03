import * as React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CircularIndeterminate() {
  return (
    <Box sx={{width:"100%", display: "flex", alignItems: "center", justifyContent: "center" , margin: "1rem auto"}}>
      <CircularProgress />
    </Box>
  );
}
