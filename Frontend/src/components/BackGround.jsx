import React from "react";
import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

export default function BackGround() {
  return (
    <div className="text-gray-600  mx-[15%] flex-col justify-center">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
