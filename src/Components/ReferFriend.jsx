import React from "react";

export const ReferFriend = ({ whatsappHerf, whatsapp }) => {
  return (
    <div className="main quizSubmitted">
      <p style={{}}>
        Challenge your friend and get a garunteed free credit once they answer
        this question.
      </p>
      <div>
        <a href={whatsappHerf}>
          <img
            alt="Share on WhatsApp"
            src={whatsapp}
            width={"40px"}
            height={"40px"}
          />
          <p>Challenge a friend</p>
        </a>
      </div>
    </div>
  );
};
