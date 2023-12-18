import { Fragment, useState, useRef } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Paper from "@mui/material/Paper";
import {
  Popover,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

export default function DropDownButton(props) {
  const {
    text,
    characterOptions,
    characterChoice,
    setCharacterChoice,
    action,
  } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleClick = () => {
    action();
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleCharacterChoice = (e) => {
    setCharacterChoice(e.target.value ? e.target.value : null)
    handleClose(e)
  }

  return (
    <Fragment>
      <ButtonGroup
        variant="contained"
        ref={anchorRef}
        aria-label="split button"
      >
        <Button onClick={handleClick}>{text}</Button>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popover
        sx={{
          zIndex: 1,
        }}
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        disablePortal
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Paper sx={{ p: 1, width: "10rem" }}>
          <Typography sx={{m: 1, fontWeight: 500}}>Person auswählen</Typography>
          <ToggleButtonGroup
            orientation="vertical"
            value={characterChoice}
            exclusive
            onChange={handleCharacterChoice}
            sx={{ width: "10rem" }}
          >
            <ToggleButton value={null} key={"egal"}>
              Egal
            </ToggleButton>
            {characterOptions.map((v) => {
              return (
                <ToggleButton value={v} key={v}>
                  {v}
                </ToggleButton>
              );
            })}
          </ToggleButtonGroup>
        </Paper>
      </Popover>
    </Fragment>
  );
}
