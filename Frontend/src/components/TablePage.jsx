import React from "react";
import TableComponent from "./TableComponent";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSensorData, getSensors } from "../../services/sensorsApi";
import Spinner from "./Spinner";
import { toast } from "react-toastify";

const TablePage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["sensorData"],
    queryFn: getSensorData,
    onError: () => {
      toast.info("dkjflasdjfkls");
    },
  });
  if (isLoading) return <Spinner />;
  return <TableComponent data={data} />;
};

export default TablePage;
