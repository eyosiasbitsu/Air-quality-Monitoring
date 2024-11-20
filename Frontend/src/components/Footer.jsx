import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-300 py-4 text-sm min-h-20 flex items-center">
      <div className="container flex justify-between items-center px-4 mx-[15%]">
        {/* Left Side */}
        <div className="text-gray-600">&copy; 2024 Clean Air</div>

        {/* Center Links */}
        <div className="flex space-x-4">
          <a href="#" className="text-gray-600 hover:underline">
            Help
          </a>
          <a href="#" className="text-gray-600 hover:underline">
            Privacy
          </a>
          <a href="#" className="text-gray-600 hover:underline">
            Terms
          </a>
        </div>

        {/* Right Side */}
        <div className="flex space-x-4 items-center">
          {/* Social Icons */}
          <a href="#" className="text-gray-600">
            <i className="fab fa-facebook"></i>
          </a>
          <a href="#" className="text-gray-600">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="#" className="text-gray-600">
            <i className="fab fa-instagram"></i>
          </a>
          {/* Language Dropdown */}
          <div className="text-gray-600">English (United States)</div>
        </div>
      </div>
    </footer>
  );
}
