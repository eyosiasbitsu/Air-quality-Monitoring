export const getSensors = async () => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensors`,
  );

  return fetchedSensors.json();
};

export const getSensorData = async () => {
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensorData`,
  );

  return fetchedSensors.json();
};


export const getSensorDataBYLocation = async (position) => {
  const {lat,lng} = position
  const fetchedSensors = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/sensorData/locate?lng=${lng}&lat=${lat}`,
    {
      method: "GET",
    }
  );

  const response=await  fetchedSensors.json();
  console.log(response)
  return response
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

  console.log("dfjdslkf /n" + fetchedSensors);

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
    throw new Error("Network response was not ok");
  }
  const result = await response.json();

  return result;
};
