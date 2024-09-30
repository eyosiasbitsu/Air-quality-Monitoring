import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardLayout from "./pages/DashboardLayout";
import SignIn from "./pages/SignIn";
import RegisterSensor from "./pages/RegisterSensor";
import BackGround from "./components/BackGround";
import SensorData from "./pages/SensorData";

const App = () => {
  const backgroundStyle = {
    backgroundImage: "url('/cleanAir.jpeg')",
    height: "100%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        cacheTime: 1000 * 60 * 60 * 24,
        retry: 2,
      },
    },
  });

  return (
    <div style={backgroundStyle}>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Router>
          <Routes>
            <Route path="/" element={<BackGround />}>
              <Route index element={<DashboardLayout />}></Route>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/register" element={<RegisterSensor />} />
              <Route path="/sensordata" element={<SensorData />} />
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
