import React, { useState } from "react";
import { Link } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Make sure to install @heroicons/react

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <div className="flex items-center justify-center mt-10 mb-36 bg-inherit p-8 text-gray-100">
      <div
        className=" bg-inherit shadow-lg rounded-3xl py-8 px-32 backdrop-blur-2xl"
        style={{
          width: "45vw",
          height: "60vh", // 60% of the viewport width
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center">Sign In</h2>
        <form className="flex flex-col items-start">
          <div className=" space-y-7 w-full">
            <input
              type="text"
              placeholder="Username"
              className="border rounded-md px-2 py-2 w-full bg-inherit backdrop-brightness-50"
            />
            <div className=" relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="border bg-inherit rounded-md px-2 py-2 w-full pr-16 backdrop-brightness-50"
              ></input>
              <button
                type="button"
                onClick={() => setPasswordVisible(!passwordVisible)}
                className="absolute inset-y-0 right-0 flex items-center pr-3"
              >
                {passwordVisible ? (
                  <EyeSlashIcon className="h-6 w-6" />
                ) : (
                  <EyeIcon className="h-6 w-6 " />
                )}
              </button>
            </div>
          </div>
          <div className="text-center mt-1 text-xs self-end">
            <Link
              to="/forgot-password"
              className="text-gray-100 hover:underline "
            >
              Forgot Your Password?
            </Link>
          </div>
          <button
            type="submit"
            className="bg-gray-100 opacity-30 hover:bg-gray-300 text-gray-700 font-bold py-0 px-6 mt-3 mb-7 rounded-full"
            style={{ height: "40px", width: "60%" }} // Ensure button height is 44px
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
