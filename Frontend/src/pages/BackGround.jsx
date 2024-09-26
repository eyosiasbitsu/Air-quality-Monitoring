import React from "react";
import { Outlet } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function BackGround() {
  return (
    <div className="text-gray-600  mx-[5%]">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
