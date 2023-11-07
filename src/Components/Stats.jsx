import {
  Box,
  ChakraProvider,
  Checkbox,
  CheckboxGroup,
  Heading,
  Progress,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import right from "../assets/correct.png";
import wrong from "../assets/incorrect.png";
import preview from "../assets/preview.jpg";

export const Stats = ({ contactName, attemps, streak, percentage, grade }) => {
  const [image, setImage] = useState();

  const handleChange = (e) => {
    console.log(e.target.files);
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <ChakraProvider resetCSS={true} disableGlobalStyle={true}>
      <Box width={"340px"} overflow={"hidden"}>
        <Box
          minHeight={"150px"}
          border={"1px solid"}
          display={"flex"}
          pl={5}
          alignItems={"center"}
          gap={10}
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
                border: "1px solid",
                borderRadius: "50%",
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
                border: "1px solid",
                cursor: "pointer",
                opacity: "0",
              }}
            />
          </Box>
          <Box borderRadius={"15px"} color={"#646cff"}>
            <Text
              textTransform={"uppercase"}
              fontFamily={"Lemon, Poppins, sans-serif"}
              fontSize={30}
            >
              {contactName.split(" ")[0]
                ? contactName.split(" ")[0]
                : contactName}
            </Text>
            <Text fontFamily={"Lemon, Poppins, sans-serif"}>
              Grade : {grade}
            </Text>
          </Box>
        </Box>
        <Box
          position={"relative"}
          display={"flex"}
          alignItems={"center"}
          minHeight={"250px"}
          border={"1px solid"}
          flexDirection={"column"}
          pl={5}
        >
          <Text
            color={"#646cff"}
            fontSize={30}
            mt={2}
            fontFamily={"Lemon, Poppins, sans-serif"}
          >
            IQ Meter
          </Text>
        </Box>
        <Box minHeight={"150px"} border={"1px solid"}>
          <Text>Last 5 Days Attempts</Text>
          <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
            {attemps.map(({ Correct_Answer }, i) => (
              <img
                key={i}
                src={Correct_Answer ? right : wrong}
                alt="checkbox"
                width={"40px"}
              />
            ))}
          </Box>
        </Box>
        <Box minHeight={"150px"} border={"1px solid"}>
          <Text>Streak</Text>
          <Tag colorScheme="green">{streak} Days</Tag>
        </Box>
      </Box>
    </ChakraProvider>
  );
};
