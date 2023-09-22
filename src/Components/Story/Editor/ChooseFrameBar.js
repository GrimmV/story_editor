import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Box,
  Typography,
  ListItemButton,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { shortenFrameId } from "../../Utility/Helper";
import { useNavigate, useParams } from "react-router-dom";
import { toStoryEditorFrame } from "../../../routing/routes";
import organizeFrames from "../../../utils/orderFrames";

export default function ChooseFrameBar(props) {
  const { frames, addNewFrame, choices, addNextFrameToChoice } = props;

  const { storyId, frameId } = useParams();

  const [frameChunk, setFrameChunk] = useState("first");
  const [prevAnswerFrame, setPrevAnswerFrame] = useState(null)
  const [history, setHistory] = useState([]);

  const orderedFrames = organizeFrames(frames, choices);
  console.log(orderedFrames)

  const navigate = useNavigate();

  const handleListItemClick = (title) => {
    navigate(toStoryEditorFrame(storyId, title));
  };

  const handleAddFrame = () => {
    if (orderedFrames[frameChunk].length === 0 && frameChunk === "first") addNewFrame(null);
    // handle case where chunk is empty and not the first chunk
    else if (orderedFrames[frameChunk].length === 0) {
      let activeChoice = choices.find((v) => v.frameId === prevAnswerFrame);
      // console.log(addNewFrame)
      // console.log(activeChoice)
      // console.log(prevAnswerFrame)
      addNewFrame(prevAnswerFrame).then(frameId => {
        addNextFrameToChoice(activeChoice.id, activeChoice.answers.find(v => v.answer.de === frameChunk).identifier, frameId)
      })
    }
    else {
      addNewFrame(
        orderedFrames[frameChunk][orderedFrames[frameChunk].length - 1].id
      );
    }
  };

  const isSelected = (title) => {
    return title === frameId;
  };

  const handleAnswerNavigation = (answer, frameId) => {
    setFrameChunk(answer);
    setPrevAnswerFrame(frameId);
    setHistory([...history, {chunk: frameChunk, prevAnswerFrame: frameId}]);
  };

  const handleBackNavigation = () => {
    let lastOne = history[history.length - 1].chunk;
    let lastAnswerFrame = history[history.length - 1].prevAnswerFrame;
    setFrameChunk(lastOne);
    setPrevAnswerFrame(lastAnswerFrame)
    setHistory(history.filter((v) => v.chunk !== lastOne));
  };

  const renderChoiceButtons = (frameId) => {
    let choiceButtons = [];

    let activeChoice = choices.find((v) => v.frameId === frameId);
    let answers = activeChoice.answers;

    for (let answer of answers) {
      choiceButtons.push(
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAnswerNavigation(answer.answer.de, activeChoice.frameId)}
          key={answer.answer.de}
          sx={{m: 1}}
        >
          {answer.answer.de}
        </Button>
      );
    }

    return choiceButtons;
  };

  const renderListItems = () => {
    let listItems = [];

    for (let index in orderedFrames[frameChunk]) {
      const frame = orderedFrames[frameChunk][index];
      const id = frame.id;
      if (
        index < orderedFrames[frameChunk].length - 1 ||
        !choices.find((v) => v.frameId === id)
      ) {
        listItems.push(
          <ListItem
            disablePadding
            key={id}
            onClick={() => handleListItemClick(id)}
            sx={{
              display: "flex",
              justifyContent: "center",
              bgcolor: "secondary",
            }}
          >
            <ListItemButton selected={isSelected(id)}>
              <ListItemText primary={shortenFrameId(id)} />
            </ListItemButton>
          </ListItem>
        );
      } else {
        listItems.push(
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ListItem
              disablePadding
              key={id}
              onClick={() => handleListItemClick(id)}
              sx={{
                display: "flex",
                justifyContent: "center",
                bgcolor: "secondary",
              }}
            >
              <ListItemButton selected={isSelected(id)}>
                <ListItemText primary={shortenFrameId(id)} />
              </ListItemButton>
            </ListItem>
            <Box sx={{display: "flex"}}>
            {renderChoiceButtons(id)}

            </Box>
          </Box>
        );
      }
    }
    return listItems;
  };

  return (
    <Box
      sx={{
        width: "100%",
        backgroundColor: "paper",
        overflow: "auto",
        maxHeight: "100vh",
      }}
    >
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h3" align="center">
          {frameChunk}
        </Typography>
        {
            history.length > 0 &&
            <Button variant="contained" color="secondary" onClick={handleBackNavigation}>
            Zurück
            </Button>
        }
      </Box>
      <List aria-label="main mailbox folders">{renderListItems()}</List>
      <Divider />
      <List>
        <ListItem onClick={handleAddFrame}>
          <ListItemButton>
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Frame hinzufügen" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
}
