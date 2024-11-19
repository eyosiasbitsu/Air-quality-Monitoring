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
    queryKey: ["sensorDetail", id],
    queryFn: () => getSensorById(id),
    onError: (error) => {
      showToast(error.message, "error");
    },
  });
  console.log(data);

  if (isLoading) return <Spinner />;
  return (
    <div className="min-h-screen">
      <TablePage data={data} />
    </div>
  );
}
