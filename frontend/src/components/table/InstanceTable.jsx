import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import CircularIndeterminate from "../loader/CircularLoader";

const InstanceTable = ({ columns, rows, isLoading }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "80%",
        borderRadius: 2,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: 2,
          height: "100%",
        }}
      >
        <Table sx={{ width: "70vw" }} aria-label="styled table" >
          <TableHead sx={{ backgroundColor: "#333", height: "5rem" }}>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column}
                  sx={{
                    color: "#fff",
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textAlign: "center",
                  }}
                >
                  {column}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          {isLoading ? (
            <div style={{ width: "100%" }}>
              <CircularIndeterminate />
            </div>
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.instance_id}
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#fff",
                    "&:hover": {
                      backgroundColor: "#f1f1f1",
                    },
                  }}
                >
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      padding: "1rem",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textTransform: "capitalize",
                      textAlign: "center",
                    }}
                  >
                    {row.instance_id}
                  </TableCell>
                  <TableCell
                    component="th"
                    scope="row"
                    sx={{
                      padding: "1rem",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      textTransform: "capitalize",
                      textAlign: "center",
                    }}
                  >
                    {row.instance_details.OwnerId}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Box>
    </TableContainer>
  );
};

export default InstanceTable;
