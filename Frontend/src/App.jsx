import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import DashboardLayout from "./components/DashboardLayout";
import TablePage from "./components/TablePage";
import SignIn from "./components/SignIn";
import RegisterSensor from "./components/RegisterSensor";
import BackGround from "./pages/BackGround";

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
            </Route>
          </Routes>
        </Router>
      </QueryClientProvider>
    </div>
  );
};

export default App;
