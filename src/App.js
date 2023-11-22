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
import { Stats } from "./Components/Stats/Stats";
import { Box } from "@chakra-ui/react";
import { ExistingUser } from "./Components/ExistingUser";
import { NewUser } from "./Components/NewUser";
import { Question } from "./Components/Question";
import { ShowAnswer } from "./Components/ShowAnswer";
import { NoUserFound } from "./Components/NoUserFound";
import { RegistrationForm } from "./Components/RegistrationForm";
import { Referral } from "./Components/Referral";
import { ReferFriend } from "./Components/ReferFriend";
import { Feedback } from "./Components/Feedback";
import { RemindAndUserAdded } from "./Components/RemindAndUserAdded";
import { Home } from "./Components/Home";

const participants = Math.round((789 - 340) * Math.random()) + 340;

const loadingMessages = [
  "1 hard question makes you learn more than 50 simple ones",
  "An apple a day keeps you healthy, and a question a day makes you smart!",
  `${participants} have already attempted today's quiz`,
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

  const handleClick = async (emailParam) => {
    try {
      setLoading(true);
      localStorage.setItem("wisechamps_email", emailParam);
      const url = `https://backend.wisechamps.com/dailyQuiz`;
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
        const url = `https://backend.wisechamps.com/question/attempt`;
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
      const url = `https://backend.wisechamps.com/quizgrade`;
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
      const url = `https://backend.wisechamps.com/user/add`;
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
      const urlUser = `https://backend.wisechamps.com/user`;
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

  const handleReminder = async (value) => {
    try {
      setLoading(true);
      const urlUser = `https://backend.wisechamps.com/user/feedback`;
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

  useEffect(() => {
    if (email) {
      handleClick(email);
    }
    if (refereePhone) {
      fetchReferee(refereePhone);
    }
  }, []);

  if (error) {
    return (
      <div>
        <h1>Something Went Wrong. Please Refresh</h1>
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

  if (mode === "nouser") {
    return <NoUserFound setMode={setMode} />;
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

  if (mode === "existinguser") {
    return (
      <ExistingUser
        handleChange={handleChange}
        handleClick={handleClick}
        email={email}
      />
    );
  }

  if (mode === "referee") {
    return <Referral refereeName={refereeName} setMode={setMode} />;
  }

  if (mode === "refereeReady") {
    return (
      <NewUser
        handleChangeReferralGrade={handleChangeReferralGrade}
        handleGradeSubmit={handleGradeSubmit}
        referralGrade={referralGrade}
      />
    );
  }

  if (mode === "question") {
    return (
      <Question
        contact={contact}
        handleChangeOption={handleChangeOption}
        handleReferralSubmit={handleReferralSubmit}
        handleSubmit={handleSubmit}
        option={option}
        question={question}
        refereePhone={refereePhone}
      />
    );
  }

  if (mode === "showanswer") {
    return (
      <ShowAnswer
        correct={correct}
        incorrect={incorrect}
        option={option}
        question={question}
      />
    );
  }

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
    return <Feedback handleReminder={handleReminder} />;
  }

  if (mode === "remindmetomorrow" || mode === "useradded") {
    return (
      <RemindAndUserAdded
        groupLink={groupLink}
        referralGrade={referralGrade}
        whatsapp={whatsapp}
        whatsappChannelLink={whatsappChannelLink}
        phone={phone}
      />
    );
  }

  if (mode === "referfriend") {
    return <ReferFriend whatsapp={whatsapp} whatsappHerf={whatsappHerf} />;
  }

  if (mode === "registernow") {
    return (
      <RegistrationForm
        handleFormChange={handleFormChange}
        handleRegisterFormClick={handleRegisterFormClick}
        Id={refereeId}
        refereeName={refereeName}
        refereePhone={refereePhone}
        referralGrade={referralGrade}
        registerForm={registerForm}
        whatsapp={whatsapp}
      />
    );
  }

  return <Home logo={logo} setMode={setMode} />;
};
