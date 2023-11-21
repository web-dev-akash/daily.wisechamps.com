import React from "react";

export const RegistrationForm = ({
  refereeName,
  handleFormChange,
  referralGrade,
  refereePhone,
  handleRegisterFormClick,
  registerForm,
  refereeId,
  whatsapp,
}) => {
  return (
    <div
      className="main registerForm"
      style={{
        marginTop: "10px",
      }}
    >
      {refereeName ? (
        <p>
          <b>{refereeName}</b> attending these quizzes daily and becoming
          smarter everyday. <br /> <br />
          Join our Whatsapp group and solve such amazing questions everyday.
        </p>
      ) : (
        <p
          style={{
            textAlign: "left",
            fontWeight: "500",
            marginBottom: "5px",
          }}
        >
          <p style={{ fontSize: "18px" }}>Register here and get :</p>
          <p>
            <li>
              <b>Guaranteed 5 FREE Live Quiz Credits</b>
            </li>
          </p>{" "}
          <p>
            <li>
              <b>Personlized progress report.</b>
            </li>
          </p>
        </p>
      )}
      <br />
      <hr />
      <br />
      <form>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            inputMode="email"
            onChange={handleFormChange}
            name="email"
            id="email"
            required
          />
        </div>
        <div>
          <label htmlFor="phone">Phone</label>
          <input
            type="number"
            inputMode="tel"
            onChange={handleFormChange}
            name="phone"
            id="phone"
            required
          />
        </div>
        <div>
          <label htmlFor="student_name">Student Name</label>
          <input
            type="text"
            inputMode="text"
            onChange={handleFormChange}
            name="student_name"
            id="student_name"
            required
          />
        </div>
        <div>
          <label htmlFor="parent_name">Parent Name</label>
          <input
            type="text"
            inputMode="text"
            onChange={handleFormChange}
            name="parent_name"
            id="parent_name"
            required
          />
        </div>
        <div>
          <label htmlFor="student_grade">Student Grade</label>
          <select
            onChange={handleFormChange}
            name="student_grade"
            id="student_grade"
            defaultValue={referralGrade}
            required
          >
            <option value={"none"}>-None-</option>
            <option value={"1"}>Grade 1</option>
            <option value={"2"}>Grade 2</option>
            <option value={"3"}>Grade 3</option>
            <option value={"4"}>Grade 4</option>
            <option value={"5"}>Grade 5</option>
            <option value={"6"}>Grade 6</option>
            <option value={"7"}>Grade 7</option>
            <option value={"8"}>Grade 8</option>
          </select>
        </div>
        <button
          style={
            refereePhone
              ? {
                  border: "none",
                  padding: "0.5rem 1.5rem",
                  width: "unset",
                  marginTop: "10px",
                }
              : {
                  width: "50%",
                  padding: "0",
                  marginTop: "20px",
                }
          }
          id={!refereePhone ? "submit-btn" : ""}
          onClick={(e) => handleRegisterFormClick(e, registerForm, refereeId)}
        >
          {refereePhone ? (
            <img
              alt="Share on WhatsApp"
              src={whatsapp}
              width={"40px"}
              height={"40px"}
            />
          ) : null}
          <p
            style={{
              fontWeight: "600",
            }}
          >
            {refereeName ? "Join Now" : "Submit"}
          </p>
        </button>
      </form>
    </div>
  );
};
