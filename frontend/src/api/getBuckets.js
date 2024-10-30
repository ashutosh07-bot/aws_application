export const getBuckets = async () => {
  try {
    const response = await fetch("http://192.168.29.96:5000/aws/s3");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
