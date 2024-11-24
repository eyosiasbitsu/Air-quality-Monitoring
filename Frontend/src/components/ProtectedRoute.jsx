import { useQueryClient } from "@tanstack/react-query";
import { Navigate, Outlet } from "react-router-dom";
import React from "react";

export default function ProtectedRoute() {
  const queryClient = useQueryClient();
  const token = queryClient.getQueryData(["token"]); // Correct usage

  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  return <Outlet />;
}
