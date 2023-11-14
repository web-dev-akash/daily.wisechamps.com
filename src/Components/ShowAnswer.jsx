import React from "react";

export const ShowAnswer = ({ question, option, correct, incorrect }) => {
  return (
    <div
      className={
        question.Correct_Answer === option
          ? "correctAnswer animate__animated animate__bounceIn"
          : "wrongAnswer animate__animated animate__bounceIn"
      }
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "10px",
      }}
    >
      <p
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "2px solid white",
          borderRadius: "50%",
        }}
      >
        {question.Correct_Answer === option ? (
          <img src={correct} alt="correct-logo" width={"50px"} />
        ) : (
          <img src={incorrect} alt="incorrect-logo" width={"40px"} />
        )}
      </p>
      <p>
        {question.Correct_Answer === option
          ? "Correct Answer"
          : "Incorrect Answer"}
      </p>
    </div>
  );
};
