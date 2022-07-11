import React from "react";
// import "https://fonts.googleapis.com/icon?family=Material+Icons";
import "../CSS/login.css";

function Login({ open, children, onClose }) {
  if (!open) return null;

  return (
    <div className="popup">
      <div className="popup-inner">
        <button className="btn-close" onClick={onClose}>
          <span class="material-icons btn">close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

export default Login;
