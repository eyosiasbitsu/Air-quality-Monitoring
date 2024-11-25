export const getSensors = async () => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensors`,
  );

  return fetchedSensors.json();
};

export const getSensor = async () => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensors`,
  );

  return fetchedSensors.json();
};

export const syncData = async () => {
  try {
    const fetchedSensors = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/sync`,
    );

    if (!fetchedSensors.ok) {
      // Attempt to parse error response as JSON
      let errorMessage = "No sensor data found in Realtime Database.";

      try {
        const errorData = await fetchedSensors.json();
        errorMessage = errorData?.message || errorMessage;
      } catch (parseError) {
        console.error("Failed to parse error response as JSON:", parseError);
      }

      console.error("Error syncing data:", errorMessage);
      throw new Error(errorMessage); // Throw the parsed or fallback error message
    }

    // Parse and process the response if necessary
    const response = await fetchedSensors.json();
    return response.message || "Successfully synced"; // Return API message or default success message
  } catch (error) {
    console.error("An error occurred during syncing:", error.message);
    throw error; // Re-throw the error to propagate it further
  }
};

export const getSensorById = async (id) => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensors/${id}`,
  );

  return fetchedSensors.json();
};
export const getSensorDataBYLocation = async (position) => {
  const { lat, lng, timeFrame } = position;

  // Validate input
  if (!lat || !lng || !timeFrame) {
    throw new Error(
      "Latitude, Longitude, and TimeFrame are required parameters.",
    );
  }

  try {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/sensorData/search?lng=${lng}&lat=${lat}&timeFrame=${timeFrame}`,
      {
        method: "GET",
      },
    );

    // Check if the response status is not OK
    if (!response.ok) {
      let errorMessage = "An unknown error occurred";

      // Try to parse the response body as JSON
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage; // Use the message from the API if available
      } catch (err) {
        console.error("Error parsing error response as JSON:", err);
      }

      throw new Error(errorMessage); // Throw an error with the parsed or fallback message
    }

    // Parse and return the JSON response
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching sensor data:", error.message);
    throw new Error(
      error.message || "An error occurred while fetching sensor data.",
    );
  }
};

export const newSensor = async (newSensor) => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensors`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newSensor),
    },
  );

  if (!fetchedSensors.ok) {
    throw new Error("Failed to add user");
  }

  return fetchedSensors.json(); // or return response if no JSON response is needed
};

// Example API call for sign-in
export const signInUser = async (values) => {
  // This would be replaced with your actual sign-in API call

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/user/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    },
  );

  if (!response.ok) {
    const errorData = await response.json(); // Ensure response is parsed as JSON
    const errorMessage = errorData?.message || "An unknown error occurred";
    throw new Error(errorMessage);
  }
  const result = await response.json();

  return result;
};
