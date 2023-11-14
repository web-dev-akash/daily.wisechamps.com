import React from "react";

export const Feedback = ({ handleReminder }) => {
  return (
    <div className="feedback">
      <p
        style={{
          fontSize: "17px",
          fontWeight: "500",
          margin: "20px",
        }}
      >
        Liked Today's Question ?
        <br /> Will you come back tomorrow ?
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          id="submit-btn"
          style={{
            width: "70%",
          }}
          onClick={() => handleReminder("Yes")}
        >
          Yes
        </button>
        <button
          id="submit-btn"
          style={{
            width: "70%",
          }}
          onClick={() => handleReminder("No")}
        >
          No
        </button>
      </div>
    </div>
  );
};
