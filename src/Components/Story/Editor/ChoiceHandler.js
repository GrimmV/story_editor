import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button, Typography, Slider, Box, TextField } from "@mui/material";
import {
  addChoice,
  changePosition,
  deleteChoices,
  removeChoice,
} from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";
import { useParams } from "react-router-dom";
import { Delete } from "@mui/icons-material";
import ChoiceAnswerText from "./ChoiceAnswerText";
import EasyPopover from "../Utils/EasyPopover";

export default function ChoiceHandler(props) {
  const token = getToken();
  const { storyId, frameId } = useParams();

  const { isLastFrame, choices, refetch, refetchFrames, refetchBubbles, refetchCharacters } = props;

  const { x, y } = choices ? choices.position : { x: 0, y: 0 };
  const existingAnswers = choices
    ? choices.answers.map((v) => v.answer.de)
    : [];

  const [tmpPos, setTmpPos] = useState({ x: x, y: y });
  // State to hold the value of the text field
  const [answer, setAnswer] = useState("");

  // Function to handle changes in the text field
  const handlerAnswerChange = (event) => {
    setAnswer(event.target.value);
  };

  const moveChoices = (xPos, yPos) => {
    changePosition(token, "choices", choices.id, xPos, yPos).then(() => {
      refetch();
    });
  };

  const updatePosition = (xPos, yPos) => {
    setTmpPos({ x: xPos, y: yPos });
  };

  const addAnswerOption = () => {
    addChoice(token, choices ? choices.id : "", frameId, storyId, answer).then(
      () => {
        refetch();
        refetchFrames();
        refetchBubbles();
        refetchCharacters();
      }
    );
  };
  const removeChoices = () => {
    deleteChoices(token, choices ? choices.id : "").then(() => {
      refetch();
    });
  };

  // Function to determine whether the value is invalid
  const isInvalidValue = () => {
    return answer === "" || existingAnswers.includes(answer) || choices?.answers.length > 2;
  };

  // Function to generate appropriate error message
  const getErrorMessage = () => {
    if (choices?.answers.length > 2) return "Es können nur maximal drei Antwortmöglichkeiten erstellt werden"
    if (answer === "") return "Die Antwort darf nicht leer sein";
    if (existingAnswers.includes(answer))
      return "Die Antwortmöglichkeit existiert bereits";
    return "";
  };

  if (!isLastFrame) return <Typography fontWeight={500}>Auswahl nur beim letzten Frame möglich.</Typography>

  return (
    <Box>
      <Typography fontWeight={500}>Auswahl:</Typography>
      <Box sx={{ display: "flex", m: 1 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around",
            mb: 1,
          }}
        >
          <ChoiceAnswerText
            isInvalidValue={isInvalidValue}
            getErrorMessage={getErrorMessage}
            text={answer}
            handleChange={handlerAnswerChange}
          />
          <Box sx={{display: "flex"}}>
            <Button
              onClick={addAnswerOption}
              variant="contained"
              startIcon={<AddIcon />}
              disabled={isInvalidValue()}
            >
              Auswahl
            </Button>
            {choices && (
              <Button
                onClick={removeChoices}
                variant="contained"
                startIcon={<Delete />}
                color="error"
              >
                Alles Löschen
              </Button>
            )}
          </Box>
        </Box>
        {choices && (
          <EasyPopover notAbsolute>
            <Box>
              <Box>
                <Typography>Y-Position: {tmpPos.y}</Typography>
                <Slider
                  max={100}
                  value={tmpPos.y}
                  onChange={(event, newValue) => {
                    updatePosition(x, newValue);
                  }}
                  aria-labelledby="continuous-slider"
                  onChangeCommitted={(event, newValue) =>
                    moveChoices(x, newValue)
                  }
                />
              </Box>
              <Box>
                <Typography>X-Position: {tmpPos.x}</Typography>
                <Slider
                  max={100}
                  value={tmpPos.x}
                  onChange={(event, newValue) => {
                    updatePosition(newValue, y);
                  }}
                  aria-labelledby="continuous-slider"
                  onChangeCommitted={(event, newValue) => {
                    moveChoices(newValue, y);
                  }}
                />
              </Box>
            </Box>
          </EasyPopover>
        )}
      </Box>
    </Box>
  );
}
