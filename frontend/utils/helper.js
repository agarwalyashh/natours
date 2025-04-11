import {Slide} from "react-toastify";
export const toastStyles = {
    position: "top-center",
    autoClose: 1000,
    transition: Slide,
    style: {
      zIndex: 9999, 
      width: "auto",
      whiteSpace: "nowrap",
      padding: "12px 20px",
    },
  }