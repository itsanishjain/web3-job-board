// import React from "react";
// import PropTypes from "prop-types";
// import { toast } from "react-toastify";
// import {
//   FaInfo,
//   FaCheck,
//   FaExclamationTriangle,
//   FaBug,
//   FaExclamationCircle,
// } from "react-icons/fa";

// const ToastMessage = ({ type, message }) =>
//   console.log(type, message, ">???????????????????");
// toast(
//   <div style={{ display: "flex", color: "white" }}>
//     <div
//       style={{
//         fontSize: 15,
//         paddingTop: 8,
//         flexShrink: 0,
//         textAlign: "center",
//         width: "30px",
//       }}
//     >
//       {displayIcon({ type })}
//     </div>
//     <div style={{ flexGrow: 1, fontSize: 15, padding: "8px 12px" }}>
//       {message}
//       cooolll
//     </div>
//   </div>
// );

// ToastMessage.propTypes = {
//   message: PropTypes.string.isRequired,
//   type: PropTypes.string.isRequired,
// };

// ToastMessage.dismiss = toast.dismiss;

// export default ToastMessage;

import React from "react";
import { FaBug, FaExclamationCircle } from "react-icons/fa";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const displayIcon = (type) => {
  switch (type) {
    // case "success":
    //   return <FaCheck />;
    // case "info":
    //   return <FaInfo />;
    case "error":
      return <FaExclamationCircle />;
    default:
      return <FaBug />;
  }
};

const ToastMessage = ({ type, message }) => {
  toast(
    <div style={{ display: "flex", color: "white" }}>
      <div
        style={{
          fontSize: 18,
          paddingTop: 8,
          flexShrink: 0,
          textAlign: "center",
          width: "50px",
        }}
      >
        {displayIcon(type)}
        {message}
      </div>
    </div>
  );
};

ToastMessage.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ToastMessage;
