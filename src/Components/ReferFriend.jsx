import React from "react";

export const ReferFriend = ({ whatsappHerf, whatsapp }) => {
  return (
    <div className="quizSubmitted">
      <p>
        Challenge your friend and get a{" "}
        <p>
          <b>Guaranteed FREE credit </b>
        </p>
        once they answer this question.
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
