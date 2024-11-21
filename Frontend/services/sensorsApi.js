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
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sync`,
  );
  if (!fetchedSensors.ok) {
    const errorData = await fetchedSensors.json();
    const errorMessage = errorData?.message || "An unknown error occurred";
    console.log(errorData);
    throw new Error(errorData);
  }

  return "successfully synced";
};

export const getSensorById = async (id) => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensors/${id}`,
  );

  return fetchedSensors.json();
};

export const getSensorDataBYLocation = async (position) => {
  const { lat, lng, timeFrame } = position;
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensorData/search?lng=${lng}&lat=${lat}&timeFrame=${timeFrame}`,
    {
      method: "GET",
    },
  );
  if (!fetchedSensors.ok) {
    const errorData = await fetchedSensors.json(); // Ensure response is parsed as JSON
    const errorMessage = errorData || "An unknown error occurred";
    throw new Error(errorMessage);
  }
  const response = await fetchedSensors.json();
  return response;
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
