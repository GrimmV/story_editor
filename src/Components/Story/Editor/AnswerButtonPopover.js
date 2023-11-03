import { Box, Button, Popover, TextField } from "@mui/material";
import { useState } from "react";
import { getToken } from "../../../utils/getToken";
import { changeChoiceAnswer, changeChoiceIsCorrect, removeChoice } from "../../../fetching/update";

export default function AnswerButtonPopover(props) {
  const { answer, choicesId, refetch } = props;

  const token = getToken();

  const [anchorEl, setAnchorEl] = useState(null);
  const [newName, setNewName] = useState("");
  const [currentId, setCurrentId] = useState("");

  const openPopover = () => {
    return Boolean(anchorEl);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const handleOpenPopover = (event, id, answer) => {
    setAnchorEl(event.currentTarget);
    setNewName(answer);
    setCurrentId(id);
  };

  const handleRemoveChoice = () => {
    removeChoice(token, choicesId, currentId).then(v => {
        refetch()
        resetNewName();
        closePopover();
    })
  };

  const handleChangeName = (id) => {
    changeChoiceAnswer(token, choicesId, id, newName).then(v => {
        refetch();
        resetNewName();
    })
  };

  const handleIsCorrect = (id, isCorrect) => {
    changeChoiceIsCorrect(token, choicesId, id, isCorrect).then(v => {
        refetch();
    });
  };

  const resetNewName = () => {
    setNewName("");
  };

  return (
    <Box>
      <Button
        color={answer.correct ? "success" : "error"}
        onClick={(event) =>
          handleOpenPopover(event, answer.identifier, answer.answer["de"])
        }
        sx={{ mb: 1, display: "block" }}
        variant="contained"
      >
        {answer["answer"]["de"]}
      </Button>
      <Popover
        id={answer["identifier"]}
        open={openPopover()}
        anchorEl={anchorEl}
        onClose={closePopover}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{ p: 2 }}>
          <Box sx={{ display: "flex", m: 1 }}>
            <TextField
              value={newName}
              onChange={(event) => {
                setNewName(event.target.value);
              }}
              id="standard-basic"
              label="Antwort"
            />
            <Button
              variant="contained"
              onClick={() => handleChangeName(currentId)}
            >
              Text aktualisieren
            </Button>
          </Box>
          <Button
            variant="contained"
            onClick={() => handleIsCorrect(currentId, !answer.correct)}
            sx={{ display: "block", mb: 1, ml: 2 }}
          >
            {answer.correct
              ? "Als 'falsch' markieren"
              : "als 'richtig' markieren"}
          </Button>
          <Button
            sx={{ display: "block", ml: 2 }}
            onClick={handleRemoveChoice}
            variant="contained"
            color="error"
          >
            Löschen
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}
