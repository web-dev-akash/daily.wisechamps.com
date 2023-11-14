import React from "react";

export const Referral = ({ refereeName, setMode }) => {
  return (
    <div
      style={{
        width: "90%",
        margin: "auto",
      }}
    >
      <p>
        Lets find out if you are smarter than <b>{refereeName} </b>who
        challenged you today
      </p>
      <button
        id="submit-btn"
        style={{
          marginTop: "15px",
        }}
        onClick={() => setMode("refereeReady")}
      >
        I am Ready
      </button>
    </div>
  );
};
