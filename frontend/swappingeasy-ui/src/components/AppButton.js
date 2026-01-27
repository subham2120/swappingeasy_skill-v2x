import React from "react";

function AppButton({ text, onClick, color = "#3897f0" }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "10px",
        borderRadius: "8px",
        border: "none",
        backgroundColor: color,
        color: "white",
        cursor: "pointer",
        fontSize: "14px",
        marginTop: "10px"
      }}
    >
      {text}
    </button>
  );
}

export default AppButton;
