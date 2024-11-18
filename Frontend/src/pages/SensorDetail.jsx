import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useParams } from "react-router";
import { getSensor, getSensorById } from "../../services/sensorsApi";
import showToast from "../components/Toast";
import Spinner from "../components/Spinner";
import TablePage from "../components/TablePage";

export default function SensorDetail() {
  const { id } = useParams();
  const { isLoading, data } = useQuery({
    queryKey: ["sensors"],
    queryFn: () => getSensor,
    onError: (error) => {
      showToast(error.message, "error");
    },
  });

  const filteredSensor = Array.isArray(data)
    ? data?.filter((sensor) => sensor._id == id)[0]
    : "";
  console.log(filteredSensor);

  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen">
      <TablePage data={filteredSensor} />
    </div>
  );
}
