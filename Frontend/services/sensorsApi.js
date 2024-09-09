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
