import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";
import CircularIndeterminate from "../loader/CircularLoader";

export default function BucketTable({ columns, rows, isLoading }) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        height: "80%",
        // position: "fixed",
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
          <TableHead sx={{ backgroundColor: "#333", height: "5rem" }} >
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
            <div style={{width:"100%"}}>
                <CircularIndeterminate />
            </div>
            
          ) : (
            <TableBody>
              {rows.map((row, index) => (
                <TableRow
                  key={row.bucket_name}
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
                    {row.bucket_name}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </Box>
    </TableContainer>
  );
}
