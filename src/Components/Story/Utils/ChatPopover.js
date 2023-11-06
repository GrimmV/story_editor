import { Chat } from "@mui/icons-material";
import { Box, Button, Popover } from "@mui/material";
import { useState } from "react";

export default function ChatPopover(props) {
  const { children } = props;
  const [anchorEl, setAnchorEl] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const outerStyle = { display: "flex" };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
//   button.onClick = handleClick
  return (
    <Box sx={outerStyle}>
      <Button onClick={handleClick} color="secondary" variant="contained" sx={{borderRadius: 100}} startIcon={<Chat/>}>ChatGPT Empfehlung anzeigen</Button>
      <Popover
        id={id}
        
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Box sx={{maxWidth: "35rem", m: 2}}>
        {children}
        </Box>
      </Popover>
    </Box>
  );
}
