import React, { useEffect, useState } from "react";
import BasicTable from "../table/Table";
import { getBuckets } from "../../api/getBuckets";
import { createBucket } from "../../api/createBucket";
import { Box, Typography } from "@mui/material";
import FormDialog from "../form/CreateForm";

const TablePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getBuckets();
        if (data) {
          setData(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreate = async (e, name) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBucket(name);
      const data = await getBuckets();
      setData(data.data);
    } catch (error) {
      console.error("Error creating bucket:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box
        sx={{
          maxWidth: "80vw",
          margin: "2rem auto",
          padding: "2rem",
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "#fafafa",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          Bucket List
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            margin: "1rem auto",
          }}
        >
          <FormDialog handleSubmit={handleCreate} />
        </Box>
        <BasicTable columns={["Bucket Name"]} rows={data} isLoading={loading} />
      </Box>
    </>
  );
};

export default TablePage;
