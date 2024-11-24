import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { syncData } from "../../services/sensorsApi";
import showToast from "./Toast";

export default function Header() {
  const navigate = useNavigate();

  const location = useLocation();
  console.log(location);
  // UseQuery for GET request
  const { data, isLoading, refetch, error } = useQuery({
    queryKey: ["syncData"],
    queryFn: () => syncData(),
    enabled: false, // Prevent automatic fetching
    onSuccess: () => {
      showToast("Data synced successfully!", "success");
    },
    // onError: (error) => {
    //   showToast(error.message || "Failed to sync data.", "error");
    // },
  });

  if (error) {
    showToast(error.message, "info");
  }

  // Handle Submit
  function handleSubmit() {
    refetch(); // Trigger the GET request
  }

  return (
    <nav className="bg-inherit flex justify-between md:justify-around mx-0 md:mx-[10%]  pb-1 md:pb-3 pt-6  rounded-2xl font-normal text-white border-b">
      <div className="md:text-4xl font-bold">
        <button onClick={() => navigate("/")}>CleanAir</button>
      </div>
      <div className="flex gap-8 justify-end h-fit w-fit">
        {location.pathname == "/" && (
          <button
            disabled={isLoading}
            className="border rounded-2xl px-7 py-2 font-semibold backdrop-blur-xl hover:backdrop-brightness-50"
            onClick={() => navigate("/signin")}
          >
            login
          </button>
        )}
        <button
          disabled={isLoading}
          className="border rounded-2xl px-7 py-2 font-semibold backdrop-blur-xl hover:backdrop-brightness-50"
          onClick={handleSubmit}
        >
          {isLoading ? "Syncing..." : "Sync data"}
        </button>
      </div>
    </nav>
  );
}
