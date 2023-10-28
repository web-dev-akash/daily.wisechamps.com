import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import whatsapp from "./assets/whatsapp.svg";

export const App = () => {
  const query = new URLSearchParams(window.location.search);
  const [email, setEmail] = useState(query.get("email"));
  const [refereePhone, setRefereePhone] = useState(
    query.get("refereeId") ? query.get("refereeId") : ""
  );

  const [refereeName, setRefereeName] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [mode, setMode] = useState(refereePhone ? "referee" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState({});
  const [option, setOption] = useState("");
  const [contact, setContact] = useState("");
  const [contactName, setContactName] = useState("");
  const [phone, setPhone] = useState("");
  const [referralGrade, setReferralGrade] = useState("");
  const [registerForm, setRegisterForm] = useState({
    email: "",
    phone: "",
    parent_name: "",
    student_name: "",
    student_grade: referralGrade,
  });

  const groupLink = {
    1: "https://chat.whatsapp.com/HbzkEq9NAlyH2yoYyeQGyN",
    2: "https://chat.whatsapp.com/JqCJFaOyUXZ63VnL7tS9uT",
    3: "https://chat.whatsapp.com/GzfJID0FO4IKRniHh7xJFp",
    4: "https://chat.whatsapp.com/DvmyeHlCjX9DR1BGf9um5b",
    5: "https://chat.whatsapp.com/C80PqSRUVhB99KDsqnt4RU",
    6: "https://chat.whatsapp.com/HikqKdugjl1GEivi3z6uu8",
    7: "https://chat.whatsapp.com/Fqy58AAIdXe8e5hOmaBAmG",
    8: "https://chat.whatsapp.com/IBTREs50YrpKufj77GEnNi",
  };

  let whatsappHerf = `https://wa.me?text=Hey%20Friend!%0A%0ALike%20me%20you%20can%20improve%20your%20*VITAMIN%20IQ*%20by%20attempting%20daily%20quizzes%20with%20*WISECHAMPS*.%0A%0AAnswer%20today%27s%20amazing%20question%20and%20get%20free%20quiz%20credits.%0A%0AQuiz%20Link%20-%20https%3A%2F%2Fdaily.wisechamps.com%3FrefereeId=${phone}`;

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

  const handleChangeReferralGrade = (e) => {
    const referralgrade = e.target.value;
    setReferralGrade(referralgrade);
  };

  const handleFormChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    setRegisterForm({ ...registerForm, [name]: value });
  };

  console.log("Form", registerForm);

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
        setContactName(res.data.name);
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
      setMode("attemptcaptured");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleGradeSubmit = async (referralGrade, phone) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.app/dailyQuiz/grade`;
      const res = await axios.post(url, { grade: referralGrade, phone: phone });
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
      setMode("registernow");
      setRegisterForm({ ...registerForm, student_grade: referralGrade });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleRegisterFormClick = async (e, data, refereeId) => {
    try {
      e.preventDefault();
      if (
        !data.email ||
        !data.phone ||
        !data.parent_name ||
        !data.student_name ||
        !data.student_grade
      ) {
        alert("Please Fill all the required details.");
        return;
      }
      setLoading(true);
      const url = `https://backend.wisechamps.app/user/add`;
      const res = await axios.post(url, {
        email: data.email,
        phone: data.phone,
        parent_name: data.parent_name,
        student_name: data.student_name,
        student_grade: data.student_grade,
        referralId: refereeId,
      });
      const mode = res.data.mode;
      window.location.assign(groupLink[referralGrade]);
      setMode(mode);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const fetchReferee = async (phone) => {
    try {
      setLoading(true);
      const urlUser = `https://backend.wisechamps.app/user`;
      const resUser = await axios.post(urlUser, { phone: phone });
      const modeUser = resUser.data.mode;
      if (modeUser === "user") {
        setRefereeName(resUser.data.user.name);
        setRefereeId(resUser.data.user.id);
      }
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
    if (refereePhone) {
      fetchReferee(refereePhone);
    }
  }, []);

  if (mode === "registernow") {
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
          ""
        )}
        <br />
        <hr />
        <br />
        <form>
          <div>
            <label>Email</label>
            <input
              type="email"
              inputMode="email"
              onChange={handleFormChange}
              name="email"
              required
            />
          </div>
          <div>
            <label>Phone</label>
            <input
              type="tel"
              inputMode="tel"
              onChange={handleFormChange}
              name="phone"
              required
            />
          </div>
          <div>
            <label>Parent Name</label>
            <input
              type="text"
              inputMode="text"
              onChange={handleFormChange}
              name="parent_name"
              required
            />
          </div>
          <div>
            <label>Student Name</label>
            <input
              type="text"
              inputMode="text"
              onChange={handleFormChange}
              name="student_name"
              required
            />
          </div>
          <div>
            <label>Student Grade</label>
            <select
              onChange={handleFormChange}
              name="student_grade"
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
            style={{
              border: "none",
              padding: "0.5rem 1.5rem",
              width: "unset",
              marginTop: "10px",
            }}
            onClick={(e) => handleRegisterFormClick(e, registerForm, refereeId)}
          >
            <img
              alt="Share on WhatsApp"
              src={whatsapp}
              width={"40px"}
              height={"40px"}
            />
            <p
              style={{
                fontWeight: "600",
              }}
            >
              Join Now
            </p>
          </button>
        </form>
      </div>
    );
  }

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
        }}
      >
        <p style={{ fontSize: "18px" }}>
          {mode === "referee"
            ? "Loading.."
            : mode !== "question"
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

  console.log(mode);

  if (mode === "noquestion") {
    return (
      <div>
        <p>OPPS! No question is available, Please try again tomorrow</p>
      </div>
    );
  }

  if (mode === "referee") {
    return (
      <div
        style={{
          width: "90%",
          margin: "auto",
        }}
      >
        <p>
          Lets find out if you are smarter than <b>{refereeName} </b>who
          challenged you today
        </p>
        <button
          id="submit-btn"
          style={{
            marginTop: "15px",
          }}
          onClick={() => setMode("refereeReady")}
        >
          I am Ready
        </button>
      </div>
    );
  }

  if (mode === "refereeReady") {
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
  if (mode === "referfriend") {
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
  }

  if (mode === "attemptcaptured") {
    return (
      <div className="quizSubmitted">
        <p>We have successfully received your response, {contactName}</p>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <button
            id="submit-btn"
            style={{
              width: "70%",
            }}
            onClick={() => setMode("referfriend")}
          >
            I want free credits
          </button>
          <button
            id="submit-btn"
            style={{
              width: "70%",
            }}
            onClick={() => setMode("")}
          >
            I don't want free credits
          </button>
        </div>
      </div>
    );
  }

  if (mode === "question") {
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
              <img
                src={question.Question_Image_URL}
                alt="Question_Image"
                width={"250px"}
                height={"140px"}
              />
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
