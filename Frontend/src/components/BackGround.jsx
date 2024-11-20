import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function BackGround() {
  return (
    <div>
      <div className="text-gray-600 mx-3 md:mx-[15%] flex-col justify-center min-h-screen">
        <Header />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}
