import React, { useEffect, useState } from "react";
import BucketTable from "../table/BucketTable";
import { getBuckets } from "../../api/getBuckets";
import { createBucket } from "../../api/createBucket";
import { Box, Button, Typography, Snackbar, Alert } from "@mui/material";
import FormDialog from "../form/CreateForm";
import InstanceTable from "../table/InstanceTable";
import { getInstances } from "../../api/getInstances";
import { createInstance } from "../../api/createInstance";

const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showInstances, setShowInstances] = useState(false);
  const [instanceData, setInstanceData] = useState([]);
  const [creatingInstance, setCreatingInstance] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

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
        setSnackbar({
          open: true,
          message: "Error fetching buckets.",
          severity: "error",
        });
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchInstances = async () => {
      setLoading(true);
      try {
        const data = await getInstances();
        if (data) {
          setInstanceData(data.data);
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching instances:", error);
        setSnackbar({
          open: true,
          message: "Error fetching instances.",
          severity: "error",
        });
        setLoading(false);
      }
    };

    fetchInstances();
  }, []);

  const handleCreateBuckets = async (e, name) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createBucket(name);
      const data = await getBuckets();
      setData(data.data);
      setSnackbar({
        open: true,
        message: "Bucket created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error creating bucket:", error);
      setSnackbar({
        open: true,
        message: "Failed to create bucket.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInstances = async () => {
    setCreatingInstance(true);
    try {
      await createInstance();
      const data = await getInstances();
      setInstanceData(data.data);
      setSnackbar({
        open: true,
        message: "Instance created successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error creating instance:", error);
      setSnackbar({
        open: true,
        message: "Failed to create instance.",
        severity: "error",
      });
    } finally {
      setCreatingInstance(false);
    }
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
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
        <Button
          variant="outlined"
          onClick={() => setShowInstances(!showInstances)}
        >
          {showInstances ? "Show Buckets" : "Show Instances"}
        </Button>
        <Typography
          variant="h4"
          sx={{
            marginBottom: "1.5rem",
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          {showInstances ? "Instances" : "Buckets"}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
            margin: "1rem auto",
          }}
        >
          {showInstances ? (
            <Button
              variant="outlined"
              onClick={handleCreateInstances}
              disabled={creatingInstance}
            >
              {creatingInstance ? "Creating..." : "Create Instance"}
            </Button>
          ) : (
            <FormDialog handleSubmit={handleCreateBuckets} />
          )}
        </Box>
        <Box
          sx={{
            maxHeight: "75vh", 
            overflowY: "auto",
            border: "1px solid #ddd",
            borderRadius: 2,
            marginTop: "1rem",
          }}
        >
          {showInstances ? (
            <InstanceTable
              columns={["Instance ID", "Owner ID"]}
              isLoading={loading}
              rows={instanceData}
            />
          ) : (
            <BucketTable
              columns={["Bucket Name"]}
              rows={data}
              isLoading={loading}
            />
          )}
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Home;
