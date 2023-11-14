import { Box, ChakraProvider, Tag, Text } from "@chakra-ui/react";
import "react-circular-progressbar/dist/styles.css";
import React, { createRef, useState } from "react";
import right from "../../assets/correct.png";
import wrong from "../../assets/incorrect.png";
import preview from "../../assets/preview.jpg";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import { useScreenshot } from "./Screenshot";
import Compressor from "compressorjs";

export const Stats = ({
  contactName,
  attemps,
  streak,
  percentage,
  grade,
  setMode,
}) => {
  const ref = createRef(null);
  const [image, setImage] = useState(
    localStorage.getItem("fileBase64")
      ? JSON.parse(localStorage.getItem("fileBase64"))
      : null
  );
  const [screenshot, setScreenshot] = useScreenshot();

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handleChange = async (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(e.target.files[0]));
    new Compressor(file, {
      quality: 0.6,
      success: (res) => {
        getBase64(res).then((base64) => {
          localStorage.setItem("fileBase64", JSON.stringify(base64));
        });
      },
    });
  };

  const shareImage = async () => {
    setScreenshot(ref.current);
  };

  return (
    <ChakraProvider resetCSS={true} disableGlobalStyle={true}>
      <Box
        width={"340px"}
        overflow={"hidden"}
        pb={5}
        pt={[1, 1, 1, 2]}
        boxShadow={[
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0.35) 0px 5px 15px",
        ]}
        borderRadius={"20px"}
      >
        <Box ref={ref}>
          <Box
            display={"flex"}
            alignItems={"center"}
            gap={8}
            p={"10px 0"}
            pl={6}
          >
            <Box
              display={"flex"}
              position={"relative"}
              width={"120px"}
              height={"120px"}
              overflow={"hidden"}
            >
              <img
                src={image ? image : preview}
                alt="Upload"
                width={"100%"}
                height={"100%"}
                style={{
                  borderRadius: "30px",
                  objectFit: "cover",
                }}
              />
              <input
                type="file"
                onChange={handleChange}
                style={{
                  position: "absolute",
                  top: "0px",
                  left: "0px",
                  width: "120px",
                  height: "120px",
                  cursor: "pointer",
                  opacity: "0",
                }}
              />
            </Box>
            <Box color={"#646cff"}>
              <Text
                textTransform={"uppercase"}
                fontFamily={"Lemon, Poppins, sans-serif"}
                fontSize={35}
              >
                {contactName.split(" ")[0].length > 2
                  ? contactName.split(" ")[0]
                  : contactName}
              </Text>
              <Text fontFamily={"Lemon, Poppins, sans-serif"}>
                Grade : {grade}
              </Text>
            </Box>
          </Box>
          <Box>
            <Text
              textAlign={"left"}
              color={"#646cff"}
              fontSize={24}
              m={"10px 0 10px 20px"}
              fontFamily={"Lemon, Poppins, sans-serif"}
            >
              IQ Meter :
            </Text>
            <Box
              style={{
                width: "60%",
                margin: "0px auto 10px auto",
              }}
            >
              <AnimatedProgressProvider value={percentage} />
            </Box>
          </Box>
          {attemps.length > 0 ? (
            <Box>
              <Text
                textAlign={"left"}
                color={"#646cff"}
                fontSize={24}
                m={"20px 0 20px 20px"}
                fontFamily={"Lemon, Poppins, sans-serif"}
              >
                Last 5 Attempts :
              </Text>
              <Box
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
                flexDirection={"row-reverse"}
                gap={2}
              >
                {attemps.map(({ Correct_Answer, Attempt_Date }, i) => (
                  <Box
                    key={i}
                    display={"flex"}
                    justifyContent={"center"}
                    alignItems={"center"}
                    flexDirection={"column"}
                    gap={1}
                  >
                    <img
                      src={Correct_Answer ? right : wrong}
                      alt="checkbox"
                      width={"40px"}
                    />
                    <Tag
                      size={"sm"}
                      colorScheme={Correct_Answer ? "green" : "red"}
                    >
                      {new Date(Attempt_Date).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                      })}
                    </Tag>
                  </Box>
                ))}
              </Box>
            </Box>
          ) : null}
          <Box display={"flex"} alignItems={"center"} gap={8} m={"15px 0"}>
            <Text
              textAlign={"left"}
              color={"#646cff"}
              fontSize={24}
              m={"20px 0 20px 20px"}
              fontFamily={"Lemon, Poppins, sans-serif"}
            >
              Streak :
            </Text>
            <Tag colorScheme="green" fontSize={"18px"} padding={"10px 20px"}>
              {streak} Days
            </Tag>
          </Box>
        </Box>
        <Box display={"flex"} justifyContent={"center"} gap={5}>
          {/* <button
            id="submit-btn"
            style={{ width: "40%" }}
            onClick={() => shareImage()}
          >
            Share
          </button> */}
          <button
            id="submit-btn"
            style={{ width: "80%" }}
            onClick={() => setMode("likedtodaysquestion")}
          >
            Continue
          </button>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
