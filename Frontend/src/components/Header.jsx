import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaToggleOff } from "react-icons/fa6";

export default function Header() {
  return (
    <nav className="bg-inherit flex justify-around mx-[13%] pb-3 pt-6  rounded-2xl font-normal text-gray-100">
      <div className="flex gap-8">
        <span> Home</span>
        <span>Admin Page</span>
      </div>
      <div className="flex gap-4">
        <IoIosNotifications size="25px" />
        <FaToggleOff size="25px" />
      </div>
    </nav>
  );
}
