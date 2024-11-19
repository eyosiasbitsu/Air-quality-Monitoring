import React from "react";
import TableComponent from "./TableComponent";
import { useQuery } from "@tanstack/react-query";
import { getSensor } from "../../services/sensorsApi";
import Spinner from "./Spinner";
import showToast from "./Toast";

const TablePage = ({ data }) => {
  return <TableComponent data={data} />;
};

export default TablePage;
