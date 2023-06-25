import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function notifyError(message) {
  toast.error(message, {
    theme: "colored",
    autoClose: 1500,
  });
}

export function notifySuccess(message) {
  toast.success(message, {
    theme: "colored",
    autoClose: 1500,
  });
}
