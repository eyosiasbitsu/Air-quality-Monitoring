// Toast.jsx
import { toast } from "react-toastify";

const activeToasts = new Set(); // Keep track of active toasts

const showToast = (message, type = "info", duration = 3000) => {
  const typeStyles = {
    success:
      "bg-inherit text-green-700 border-l-4 border-green-500 backdrop-blur-2xl font-bold",
    error:
      " bg-inherit text-red-700 border-l-4 border-red-500 backdrop-blur-2xl font-bold",
    warning:
      "bg-inherit text-yellow-700 border-l-4 border-yellow-500 backdrop-blur-2xl font-bold",
    info: "bg-inherit text-blue-700 border-l-4 border-blue-500 backdrop-blur-2xl font-bold",
  };

  if (activeToasts.has(message)) {
    return; // Skip if this message is already active
  }

  activeToasts.add(message); // Mark the toast as active

  toast(message, {
    className: `${typeStyles[type]} p-4 rounded-md`,
    onClose: () => {
      activeToasts.delete(message); // Remove from active set when toast is closed
    },
    autoClose: duration, // Duration before toast auto-closes
  });
};

export default showToast;
