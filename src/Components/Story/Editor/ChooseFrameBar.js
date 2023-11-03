import React, { useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Box,
  ListItemButton,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { toStoryEditorFrame } from "../../../routing/routes";
import DnDList from "./DnDList";
import { ArrowBack } from "@mui/icons-material";

export default function ChooseFrameBar(props) {
  const { orderedFrames, titleFrame, addNewFrame, choices, removeFrame } = props;

  const { storyId, frameId } = useParams();
  const navigate = useNavigate();
  const titleFrames = orderedFrames[titleFrame];
  useEffect(() => {
    if (!frameId){
      navigate(
        toStoryEditorFrame(
          storyId,
          orderedFrames["first"].find((frame) => {
            return frame.frame.first
          }).frame.id
        ),
        {replace: true},
      );

    }
  }, [frameId]);


  const handleAnswerNavigation = (frameId) => {
    navigate(toStoryEditorFrame(storyId, frameId));
  };

  const hasChoices = choices.find((v) => v.frameId === titleFrames[titleFrames.length - 1].frame.id);

  const renderChoiceButtons = () => {
    let choiceButtons = [];

    let activeChoice = choices.find((v) => v.frameId === titleFrames[titleFrames.length - 1].frame.id);

    if (!activeChoice) return;
    let answers = activeChoice.answers;

    for (let answer of answers) {
      choiceButtons.push(
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAnswerNavigation(answer.nextFrame)}
          key={answer.answer.de}
          sx={{ m: 1 }}
        >
          {answer.answer.de}
        </Button>
      );
    }

    return choiceButtons;
  };

  const getAnswerByTitleFrame = () => {

    if (choices) {
      for (let choice of choices) {
        let filteredAnswer = choice.answers.find(answer => answer.identifier === titleFrame);
        if (filteredAnswer) return filteredAnswer.answer.de
      }
    }
    return ""
  }

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "paper",
        overflow: "auto",
        maxHeight: "100vh",
      }}
    >
      {titleFrame !== "first" && (
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", m: 1 }}>
          <Typography sx={{fontWeight: 500}}>{getAnswerByTitleFrame()}</Typography>
          <Button
            startIcon={<ArrowBack />}
            color="error"
            onClick={() =>
              navigate(
                toStoryEditorFrame(storyId, orderedFrames["first"][0].frame.id)
              )
            }
          >
            Zurück
          </Button>
        </Box>
      )}
      <DnDList
        items={titleFrames}
        hasChoices={hasChoices}
        addFrame={addNewFrame}
        removeFrame={removeFrame}
      />
      <Box sx={{ ml: 4, mb: 3 }}>{renderChoiceButtons()}</Box>
      {titleFrames.length === 0 && (
        <List>
          <ListItem onClick={() => addNewFrame(frameId)}>
            <ListItemButton>
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText primary="Frame hinzufügen" />
            </ListItemButton>
          </ListItem>
        </List>
      )}
    </Paper>
  );
}
