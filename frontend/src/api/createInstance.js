export const createInstance = async () => {
  try {
    const baseUrl = `${process.env.REACT_APP_BASE_URL}/aws/ec2`;
    const response = await fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        "Failed to create instance. Network response was not ok."
      );
    }

    // Return response to handle it in the component
    return { status: response.status, data: await response.json() };
  } catch (error) {
    console.error("Error in createInstance:", error);
    throw error; // Re-throw error to be handled in the component
  }
};