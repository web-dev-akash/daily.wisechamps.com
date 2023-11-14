import React from "react";

export const Question = ({
  question,
  handleChangeOption,
  refereePhone,
  handleReferralSubmit,
  handleSubmit,
  contact,
  option,
}) => {
  return (
    <div className="question">
      <div className="radio-input-wrapper">
        <p>{question.Question ? question.Question : ""}</p>
        {question.Question_Image_URL ? (
          <div
            style={{
              maxWidth: "100%",
              margin: "10px auto",
              border: "1px solid #ccc",
            }}
          >
            <img src={question.Question_Image_URL} alt="Question_Image" />
          </div>
        ) : (
          ""
        )}
        <label className="label">
          <input
            value="Option 1"
            name="value-radio"
            id="value-2"
            className="radio-input"
            type="radio"
            onChange={handleChangeOption}
          />
          <div className="radio-design"></div>
          <div className="label-text">{question.Option_1}</div>
        </label>
        <label className="label">
          <input
            value="Option 2"
            name="value-radio"
            id="value-3"
            className="radio-input"
            type="radio"
            onChange={handleChangeOption}
          />
          <div className="radio-design"></div>
          <div className="label-text">{question.Option_2}</div>
        </label>
        <label className="label">
          <input
            value="Option 3"
            name="value-radio"
            id="value-4"
            className="radio-input"
            type="radio"
            onChange={handleChangeOption}
          />
          <div className="radio-design"></div>
          <div className="label-text">{question.Option_3}</div>
        </label>
        <label className="label">
          <input
            value="Option 4"
            name="value-radio"
            id="value-4"
            className="radio-input"
            type="radio"
            onChange={handleChangeOption}
          />
          <div className="radio-design"></div>
          <div className="label-text">{question.Option_4}</div>
        </label>
        <button
          style={{ marginTop: "20px" }}
          id="submit-btn"
          onClick={
            refereePhone
              ? () => handleReferralSubmit()
              : () =>
                  handleSubmit({
                    contactId: contact,
                    questionId: question.id,
                    optionSelected: option,
                    correctAnswer: question.Correct_Answer === option,
                  })
          }
        >
          Submit
        </button>
      </div>
    </div>
  );
};
