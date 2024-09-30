import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaToggleOff } from "react-icons/fa6";

export default function Header() {
  return (
    <nav className="bg-inherit flex justify-around mx-[13%] pb-3 pt-6  rounded-2xl font-normal text-black">
      <div className="text-4xl font-bold">CleanAir</div>
      <div className="flex gap-8">
        <button> Home</button>
        <button>Admin Page</button>
      </div>
    </nav>
  );
}
