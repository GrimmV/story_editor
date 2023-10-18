import { Tune } from "@mui/icons-material";
import { Box, Button, Popover } from "@mui/material";
import { useState } from "react";

export default function EasyPopover(props) {
  const { children, notAbsolute } = props;
  const [anchorEl, setAnchorEl] = useState(0);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const outerStyle = notAbsolute
    ? {}
    : { position: "absolute", top: 0, right: 0 };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
//   button.onClick = handleClick
  return (
    <Box sx={outerStyle}>
      <Button onClick={handleClick} color="primary"><Tune/></Button>
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
        <Box sx={{width: "20rem", m: 2}}>
        {children}
        </Box>
      </Popover>
    </Box>
  );
}
