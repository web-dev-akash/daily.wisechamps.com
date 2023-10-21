import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import whatsapp from "./assets/whatsapp.svg";

export const App = () => {
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [refereePhone, setRefereePhone] = useState(query.get("refereeId"));
  const [refereeName, setRefereeName] = useState(query.get(""));
  const [mode, setMode] = useState(refereePhone ? "referee" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState({});
  const [option, setOption] = useState("");
  const [contact, setContact] = useState("");
  const [phone, setPhone] = useState("");
  const [referralGrade, setReferralGrade] = useState("");

  let whatsappHerf = `https://wa.me?text=https://daily.wisechamps.com?refereeId=${phone}`;

  const emailRegex = new RegExp(
    /^[A-Za-z0-9_!#$%&'*+\/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
    "gm"
  );

  const handleChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handleChangeOption = (e) => {
    const option = e.target.value;
    setOption(option);
  };

  const handleClick = async (emailParam) => {
    if (!emailRegex.test(emailParam)) {
      alert("Please Enter a Valid Email");
      window.location.reload();
      return;
    }
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.app/dailyQuiz`;
      const res = await axios.post(url, { email: emailParam });
      const mode = res.data.mode;
      setMode(mode);
      if (mode === "question") {
        setQuestion(res.data.question);
        setContact(res.data.id);
        setPhone(res.data.phone);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleSubmit = async ({
    contactId,
    questionId,
    optionSelected,
    correctAnswer,
  }) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.app/question/attempt`;
      const res = await axios.post(url, {
        contactId,
        questionId,
        optionSelected,
        correctAnswer,
      });
      console.log(res.data);
      setMode("attemptcaptured");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleChangeReferralGrade = (e) => {
    const referralgrade = e.target.value;
    setReferralGrade(referralgrade);
  };

  const handleGradeSubmit = async (referralGrade, phone) => {
    try {
      setLoading(true);
      const urlUser = `https://backend.wisechamps.app/user`;
      const resUser = await axios.post(urlUser, { phone: phone });
      const modeUser = resUser.data.mode;
      if (modeUser === "user") {
        setRefereeName(resUser.data.user.name);
      }
      console.log(refereeName);
      const url = `https://backend.wisechamps.app/dailyQuiz/grade`;
      const res = await axios.post(url, { grade: referralGrade });
      const mode = res.data.mode;
      if (mode === "question") {
        setQuestion(res.data.question);
      }
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleReferralSubmit = async () => {
    try {
      setLoading(true);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
  }, []);

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <p style={{ fontSize: "18px" }}>
          {mode !== "question"
            ? "Finding question of the day.."
            : "Submitting your response.."}
        </p>
        <RaceBy
          size={300}
          lineWeight={20}
          speed={1.4}
          color="rgba(129, 140, 248)"
        />
      </div>
    );
  }

  if (mode === "referee") {
    return (
      <div
        className="main"
        style={{
          padding: "2rem 4rem",
        }}
      >
        <h3>Select Student's Grade</h3>
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
        <label
          className="label"
          style={{
            gap: "30px",
          }}
        >
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
          onClick={() => handleGradeSubmit(referralGrade, refereePhone)}
          style={{
            marginTop: "10px",
            width: "100%",
          }}
        >
          Submit
        </button>
      </div>
    );
  }

  if (mode === "alreadyAttempted") {
    return (
      <div>
        <p>
          It looks like you have already attempted the today's Quiz.
          <br /> You can try again tomorrow.
        </p>
      </div>
    );
  }
  if (mode === "attemptcaptured") {
    return (
      <div className="quizSubmitted">
        <p>To know the right answer, attend today's live quiz.</p>

        <p>
          A free credit will be added to your account if you are the lucky one
          to get selected.
        </p>
        <p>
          To get an ASSURED free credit, share this question with a friend, and
          both of you get one credit each.
        </p>
        <div>
          <a href={whatsappHerf}>
            <img
              alt="Share on WhatsApp"
              src={whatsapp}
              width={"40px"}
              height={"40px"}
            />
            <p>Refer a friend</p>
          </a>
        </div>
      </div>
    );
  }

  if (mode === "question") {
    return (
      <div>
        <div className="radio-input-wrapper">
          <p>{question.Question}</p>
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
                ? () =>
                    handleSubmit({
                      contactId: contact,
                      questionId: question.id,
                      optionSelected: option,
                      correctAnswer: question.Correct_Answer === option,
                    })
                : () => handleReferralSubmit()
            }
          >
            Submit
          </button>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <h1>Something Went Wrong. Please Refresh</h1>
      </div>
    );
  }

  if (mode === "nouser") {
    return (
      <div className="email-not-found">
        <p>
          This Email is not registered with us. <br />
          Please use a registered Email Address
        </p>
        <div>
          <button id="submit-btn" onClick={() => setMode("")}>
            Try Again
          </button>
          <button
            id="submit-btn"
            onClick={() => {
              window.open(
                `https://wa.me/919717094422?text=${encodeURIComponent(
                  "Please send me my registered email"
                )}`,
                "_blank"
              );
              setMode("");
            }}
          >
            Get Your Registered Email
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="main">
      <h3>Email</h3>
      <div className="form">
        <input
          className="input"
          type="email"
          placeholder="Enter Email"
          inputMode="email"
          onChange={handleChange}
        />
        <p>* Please use the registered Email.</p>
        <button id="submit-btn" onClick={() => handleClick(email)}>
          Submit
        </button>
      </div>
    </div>
  );
};
