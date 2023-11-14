import React from "react";
import { CarousalMain } from "./Carousel/js/CarousalMain";

export const Home = ({ logo, setMode }) => {
  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <header>
        <img
          src={logo}
          alt="Wisechamps"
          style={{
            position: "absolute",
            width: "120px",
            top: "20px",
            left: "20px",
          }}
        />
      </header>
      <div
        className="main_div"
        style={{
          borderRadius: "20px",
        }}
      >
        <CarousalMain />
        <div>
          <p>Welcome to Wisechamps</p>
        </div>
        <div className="main-div-btn">
          <button id="submit-btn" onClick={() => setMode("existinguser")}>
            Registered User
          </button>
          <button id="submit-btn" onClick={() => setMode("refereeReady")}>
            New User
          </button>
        </div>
      </div>
    </div>
  );
};
