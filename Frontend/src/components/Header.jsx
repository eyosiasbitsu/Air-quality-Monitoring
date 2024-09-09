import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaToggleOff } from "react-icons/fa6";

export default function Header() {
  return (
    <nav className="bg-gray-100 flex justify-around mx-[13%] py-10 mb-10 rounded-2xl font-normal">
      <div className="flex gap-8">
        <span> Home</span>
        <span>Add Sensors</span>
      </div>
      <div className="flex gap-4">
        <IoIosNotifications size="25px" />
        <FaToggleOff size="25px" />
      </div>
    </nav>
  );
}
