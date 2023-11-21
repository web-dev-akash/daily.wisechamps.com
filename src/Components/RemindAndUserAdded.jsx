import React from "react";
import { ReferFriend } from "./ReferFriend";

export const RemindAndUserAdded = ({
  whatsappChannelLink,
  whatsapp,
  groupLink,
  referralGrade,
  phone,
}) => {
  let whatsappHerf = `https://wa.me?text=Hey%20Friend!%0A%0ALike%20me%20you%20can%20improve%20your%20*VITAMIN%20IQ*%20by%20attempting%20daily%20quizzes%20with%20*WISECHAMPS*.%0A%0AAnswer%20today%27s%20amazing%20question%20and%20get%20free%20quiz%20credits.%0A%0AQuiz%20Link%20-%20https%3A%2F%2Fdaily.wisechamps.com%3FrefereeId=${phone}`;
  return (
    <div className="quizSubmitted">
      <ReferFriend whatsapp={whatsapp} whatsappHerf={whatsappHerf} />
      {/* <p
        style={{
          fontSize: "17px",
          fontWeight: "500",
          margin: "20px",
        }}
      >
        To stay connected and get daily reminders
      </p> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <a
          href={whatsappChannelLink}
          style={{
            padding: "0 30px",
          }}
        >
          <img
            alt="Join WhatsApp Channel"
            src={whatsapp}
            width={"40px"}
            height={"40px"}
          />
          <p>Join Our Channel</p>
        </a>
        <a
          href={groupLink[referralGrade]}
          style={{
            padding: "0 40px",
          }}
        >
          <img
            alt="Join WhatsApp Group"
            src={whatsapp}
            width={"40px"}
            height={"40px"}
          />
          <p>Join Our Group</p>
        </a>
      </div>
    </div>
  );
};
