import React from "react";
import TableComponent from "./TableComponent";
import { useOutletContext } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSensorData, getSensors } from "../../services/sensorsApi";
import Spinner from "./Spinner";

const TablePage = ({ filteredData }) => {
  const { data, isLoading } = useQuery({
    queryKey: ["sensorData"],
    queryFn: getSensorData,
  });

  console.log(data);
  if (isLoading) return <Spinner />;
  return <TableComponent data={data} />;
};

export default TablePage;
