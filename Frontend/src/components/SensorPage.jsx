import React from "react";
import TableComponent from "./TableComponent";
import { useQuery } from "@tanstack/react-query";
import { getSensor } from "../../services/sensorsApi";
import Spinner from "./Spinner";
import showToast from "./Toast";
import SensorList from "./SensorList";

const SensorPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sensors"],
    queryFn: getSensor,
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  console.log(data);
  if (isLoading) return <Spinner />;
  return <SensorList data={data} />;
};

export default SensorPage;
