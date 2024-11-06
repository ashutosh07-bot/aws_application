export const getInstances = async () => {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/aws/ec2`;
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
