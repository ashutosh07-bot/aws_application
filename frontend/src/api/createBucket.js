export const createBucket = async (name) => {
  const data = {
    bucketName: name,
  };

  try {
    const response = await fetch("http://192.168.29.96:5000/aws/s3", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  } catch (error) {
    console.log(error);
    alert("Alredy have a bucket with this name.");
  }
};
