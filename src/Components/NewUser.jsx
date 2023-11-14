import React from "react";

export const NewUser = ({
  handleChangeReferralGrade,
  handleGradeSubmit,
  referralGrade,
}) => {
  return (
    <div className="main mainReferee">
      <h3>Select Your Grade</h3>
      <label className="label">
        <input
          value="1"
          name="value-radio"
          id="value-2"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 1
        </div>
      </label>
      <label className="label">
        <input
          value="2"
          name="value-radio"
          id="value-3"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 2
        </div>
      </label>
      <label className="label">
        <input
          value="3"
          name="value-radio"
          id="value-4"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 3
        </div>
      </label>
      <label className="label">
        <input
          value="4"
          name="value-radio"
          id="value-4"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 4
        </div>
      </label>
      <label className="label">
        <input
          value="5"
          name="value-radio"
          id="value-2"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 5
        </div>
      </label>
      <label className="label">
        <input
          value="6"
          name="value-radio"
          id="value-3"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 6
        </div>
      </label>
      <label className="label">
        <input
          value="7"
          name="value-radio"
          id="value-4"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 7
        </div>
      </label>
      <label className="label">
        <input
          value="8"
          name="value-radio"
          id="value-4"
          className="radio-input"
          type="radio"
          onChange={handleChangeReferralGrade}
        />
        <div className="radio-design"></div>
        <div
          className="label-text"
          style={{
            textTransform: "uppercase",
            fontWeight: "600",
            letterSpacing: "1px",
          }}
        >
          Grade 8
        </div>
      </label>
      <button
        id="submit-btn"
        onClick={() => handleGradeSubmit(referralGrade)}
        style={{
          marginTop: "10px",
          width: "100%",
        }}
      >
        Submit
      </button>
    </div>
  );
};
