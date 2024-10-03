import React from "react";
import { Bars } from "react-loader-spinner";

export default function Spinner() {
  return (
    <div className="flex justify-center ">
      <Bars
        height="60"
        width="60"
        color="#4fa94d"
        ariaLabel="bars-loading"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}
