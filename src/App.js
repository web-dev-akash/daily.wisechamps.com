import { useState } from "react";
import { RaceBy } from "@uiball/loaders";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import whatsapp from "./assets/whatsapp.svg";
import correct from "./assets/correct.png";
import incorrect from "./assets/incorrect.png";
import logo from "./assets/Logo.png";
import "animate.css";
import { CarousalMain } from "./Components/Carousel/js/CarousalMain";
import { Stats } from "./Components/Stats";
import { Box } from "@chakra-ui/react";

const participants = Math.round((789 - 340) * Math.random()) + 340;

const loadingMessages = [
  "1 hard question makes you learn more than 50 simple ones",
  "An apple a day keeps you healthy, and a question a day makes you smart!",
  `${participants} have already attempted today’s quiz`,
  "Rome was not built in a day, and so is true of your IQ!",
  "Habit is what turns talent into genius! Make sure you practice everyday",
];

export const App = () => {
  const query = new URLSearchParams(window.location.search);
  const localEmail = localStorage.getItem("wisechamps_email")
    ? localStorage.getItem("wisechamps_email")
    : null;
  const [email, setEmail] = useState(
    query.get("email") ? query.get("email") : localEmail
  );
  const [refereePhone, setRefereePhone] = useState(
    query.get("refereeId") ? query.get("refereeId") : ""
  );

  const [feedbackData, setFeedbackData] = useState({
    difficulty: "",
    think: "",
    remind: "",
  });
  // To attend more such exiting question join out live quizzes

  const [refereeName, setRefereeName] = useState("");
  const [refereeId, setRefereeId] = useState("");
  const [mode, setMode] = useState(refereePhone ? "referee" : "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [question, setQuestion] = useState({});
  const [attempts, setAttempts] = useState([]);
  const [streak, setStreak] = useState(1);
  const [percentage, setPercentage] = useState(15);
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

  let whatsappChannelLink = `https://whatsapp.com/channel/0029VaDJVAS1t90kQj9ymi27`;

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
    if (name === "student_grade") {
      setReferralGrade(value);
    }
    setRegisterForm({
      ...registerForm,
      [name]: value,
      student_grade: referralGrade,
    });
  };

  console.log("Form", registerForm);

  const handleClick = async (emailParam) => {
    try {
      setLoading(true);
      localStorage.setItem("wisechamps_email", emailParam);
      const url = `https://backend.wisechamps.app/dailyQuiz`;
      const res = await axios.post(url, { email: emailParam });
      const mode = res.data.mode;
      setMode(mode);
      if (mode === "question") {
        setQuestion(res.data.question);
        setContact(res.data.id);
        setPhone(res.data.phone);
        setContactName(res.data.name);
        setReferralGrade(res.data.grade);
        setAttempts(res.data.attempts);
        setStreak(res.data.streak);
        setPercentage(res.data.percentage);
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
      setMode("showanswer");
      setTimeout(async () => {
        setLoading(true);
        const url = `https://backend.wisechamps.app/question/attempt`;
        const res = await axios.post(url, {
          contactId,
          questionId,
          optionSelected,
          correctAnswer,
        });
        if (email) {
          setMode("attemptcaptured");
        } else {
          setMode("likedtodaysquestion");
        }
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  const handleGradeSubmit = async (referralGrade) => {
    try {
      setLoading(true);
      const url = `https://backend.wisechamps.app/quizgrade`;
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
      setMode("showanswer");
      setTimeout(() => {
        setLoading(true);
        setMode("registernow");
        setRegisterForm({ ...registerForm, student_grade: referralGrade });
        setLoading(false);
      }, 2000);
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
      if (!emailRegex.test(data.email)) {
        alert("Please Enter a Valid Email");
        return;
      }
      if (data.phone.length < 10) {
        alert("Please Enter a Valid Phone Number");
        return;
      }
      if (data.parent_name.length < 3) {
        alert("Please Enter a Valid Parent Name");
        return;
      }
      if (data.student_name.length < 3) {
        alert("Please Enter a Valid Student Name");
        return;
      }
      if (data.student_grade.value === "none") {
        alert("Please select a Valid Student Grade");
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
        referralId: refereeId ? refereeId : "",
      });
      const mode = res.data.mode;
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
          <p
            style={{
              textAlign: "center",
              fontWeight: "500",
              marginBottom: "5px",
            }}
          >
            Register with us to save your progress and get reminders.
          </p>
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
              type="number"
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
  }

  if (loading) {
    return (
      <div
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <p
          style={{
            fontSize: "18px",
            width: "90%",
          }}
        >
          {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
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

  if (mode === "noquestion") {
    return (
      <div>
        <p>OOPS! No question available, Please try again tomorrow</p>
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

  const handleReminder = async (value) => {
    try {
      setLoading(true);
      const urlUser = `https://backend.wisechamps.app/user/feedback`;
      const resUser = await axios.post(urlUser, {
        feedbackData: {
          email: email,
          difficulty: value,
          think: "",
          remind: "",
        },
      });
      !contact && !refereePhone
        ? setMode("registernow")
        : setMode("remindmetomorrow");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.log("error is ------------", error);
    }
  };

  console.log("Feedback data :", feedbackData);

  if (mode === "attemptcaptured") {
    return (
      <Box display={"flex"} placeItems={"center"}>
        <Stats
          contactName={contactName}
          attemps={attempts}
          streak={streak}
          percentage={percentage}
          grade={referralGrade}
          setMode={setMode}
        />
      </Box>
    );
  }

  if (mode === "likedtodaysquestion") {
    return (
      <div className="feedback">
        <p
          style={{
            fontSize: "17px",
            fontWeight: "500",
            margin: "20px",
          }}
        >
          Liked Today's Question ?
          <br /> Will you come back tomorrow ?
        </p>
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
            onClick={() => handleReminder("Yes")}
          >
            Yes
          </button>
          <button
            id="submit-btn"
            style={{
              width: "70%",
            }}
            onClick={() => handleReminder("No")}
          >
            No
          </button>
        </div>
      </div>
    );
  }

  if (mode === "remindmetomorrow" || mode === "useradded") {
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
  }

  if (mode === "showanswer") {
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

  if (mode === "newuser") {
    return (
      <div>
        <h1>New User</h1>
      </div>
    );
  }

  if (mode === "existinguser") {
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
  }

  return (
    <div
      style={{
        minHeight: "85vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "10px",
      }}
    >
      <header>
        <img
          src={logo}
          alt="Wisechamps"
          style={{
            position: "absolute",
            width: "120px",
            top: "20px",
            left: "20px",
          }}
        />
      </header>
      <div
        className="main_div"
        style={{
          borderRadius: "20px",
        }}
      >
        <CarousalMain />
        <div>
          <p>Welcome to Wisechamps</p>
          {/* <p>Please </p> */}
        </div>
        <div className="main-div-btn">
          <button id="submit-btn" onClick={() => setMode("existinguser")}>
            Registered User
          </button>
          <button id="submit-btn" onClick={() => setMode("refereeReady")}>
            New User
          </button>
        </div>
      </div>
    </div>
  );
};
