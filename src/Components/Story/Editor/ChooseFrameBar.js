import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  ListItemButton,
  Paper,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate, useParams } from "react-router-dom";
import { toStoryEditorFrame } from "../../../routing/routes";
import organizeFrames from "../../../utils/orderFrames";
import DnDList from "./DnDList";

export default function ChooseFrameBar(props) {
  const { frames, addNewFrame, moveFrame, choices, bubbles, removeFrame } = props;

  const { storyId, frameId } = useParams();

  const {orderedFrames, disconnectedFrames} = organizeFrames(frames, bubbles);

  console.log(orderedFrames)

  const navigate = useNavigate();

  // const handleAnswerNavigation = (frameId) => {
  //   navigate(toStoryEditorFrame(storyId, frameId))
  // };

  // TODO:
  // const renderChoiceButtons = (frameId) => {
  //   let choiceButtons = [];

  //   let activeChoice = choices.find((v) => v.frameId === frameId);

  //   if (!activeChoice) return;
  //   let answers = activeChoice.answers;

  //   for (let answer of answers) {
  //     choiceButtons.push(
  //       <Button
  //         color="primary"
  //         variant="contained"
  //         onClick={() =>
  //           handleAnswerNavigation(activeChoice.frameId)
  //         }
  //         key={answer.answer.de}
  //         sx={{ m: 1 }}
  //       >
  //         {answer.answer.de}
  //       </Button>
  //     );
  //   }

  //   return choiceButtons;
  // };

  return (
    <Paper
      sx={{
        width: "100%",
        backgroundColor: "paper",
        overflow: "auto",
        maxHeight: "100vh",
      }}
    >
      <DnDList items={orderedFrames} moveFrame={moveFrame} addFrame={addNewFrame} removeFrame={removeFrame}/>
      {
        orderedFrames.length === 0 &&
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
      }
    </Paper>
  );
}
