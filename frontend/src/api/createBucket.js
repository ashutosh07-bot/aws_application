export const createBucket = async (name) => {
  const data = {
    bucketName: name,
  };

  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/aws/s3`;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return { status: response.status};
  } catch (error) {
    console.error("Error in CreateBucket:", error);
    throw error; // Re-throw error to be handled in the component
  }
};
