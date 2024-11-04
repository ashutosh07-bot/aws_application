export const getBuckets = async () => {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/aws/s3`;
    const response = await fetch(baseUrl);
    console.log(response);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
