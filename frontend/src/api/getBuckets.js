export const getBuckets = async () => {
  try {
    const baseUrl = process.env.REACT_APP_BASE_URL;
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
  }
};
