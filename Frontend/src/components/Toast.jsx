// Toast.jsx
import { toast } from "react-toastify";

const showToast = (message, type = "info") => {
  const typeStyles = {
    success:
      "bg-inherit text-green-700 border-l-4 border-green-500 backdrop-blur-2xl font-bold",
    error:
      " bg-inherit text-red-700 border-l-4 border-red-500 backdrop-blur-2xl font-bold",
    warning:
      "bg-inherit text-yellow-700 border-l-4 border-yellow-500 backdrop-blur-2xl font-bold",
    info: "bg-inherit text-blue-700 border-l-4 border-blue-500 backdrop-blur-2xl font-bold",
  };

  toast(message, {
    className: `${typeStyles[type]} p-4 rounded-md`,
  });
};

export default showToast; // Default export
