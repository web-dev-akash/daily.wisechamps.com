import React from "react";

export const RemindAndUserAdded = ({
  whatsappChannelLink,
  whatsapp,
  groupLink,
  referralGrade,
}) => {
  return (
    <div className="quizSubmitted">
      <p
        style={{
          fontSize: "17px",
          fontWeight: "500",
          margin: "20px",
        }}
      >
        To stay connected and get daily reminders
      </p>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a href={whatsappChannelLink}>
          <img
            alt="Join WhatsApp Channel"
            src={whatsapp}
            width={"40px"}
            height={"40px"}
          />
          <p>Join WhatsApp Channel</p>
        </a>
        <a href={groupLink[referralGrade]}>
          <img
            alt="Join WhatsApp Group"
            src={whatsapp}
            width={"40px"}
            height={"40px"}
          />
          <p>Join WhatsApp Group</p>
        </a>
      </div>
    </div>
  );
};
