import React from "react";
import { IoIosNotifications } from "react-icons/io";
import { FaToggleOff } from "react-icons/fa6";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <nav className="bg-inherit flex justify-between md:justify-around mx-0 md:mx-[13%]  pb-1 md:pb-3 pt-6  rounded-2xl font-normal text-black">
      <div className="md:text-4xl font-bold">CleanAir</div>
      <div className="flex gap-8 justify-end">
        <Link to="/"> Home</Link>
        <Link to="/signin">signIn </Link>
      </div>
    </nav>
  );
}
