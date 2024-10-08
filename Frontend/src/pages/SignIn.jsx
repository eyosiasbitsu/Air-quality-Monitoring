import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"; // Make sure to install @heroicons/react
import { useMutation } from "@tanstack/react-query";
import { signInUser } from "../../services/sensorsApi";

const SignIn = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { isLoading, mutate } = useMutation({
    mutationFn: (obj) => signInUser(obj),
    onSuccess: () => {
      navigate("/sensordata");
    },
  });

  const handleSubmit = (e) => {};
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
              placeholder="email"
              className="border rounded-md px-2 py-2 w-full bg-inherit backdrop-brightness-50"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className=" relative">
              <input
                type={passwordVisible ? "text" : "password"}
                placeholder="Password"
                className="border bg-inherit rounded-md px-2 py-2 w-full pr-16 backdrop-brightness-50"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
            disabled={isLoading}
            className="bg-gray-100 opacity-30 hover:bg-gray-300 text-gray-700 font-bold py-0 px-6 mt-3 mb-7 rounded-full"
            style={{ height: "40px", width: "60%" }} // Ensure button height is 44px
            onClick={(e) => {
              e.preventDefault();
              mutate({ email, password });
            }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
