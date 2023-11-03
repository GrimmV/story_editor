import { HelpOutline } from "@mui/icons-material";
import { Box, IconButton, Popover, Typography } from "@mui/material";
import { useState } from "react";

export default function HelpPopover(props) {
  const { info, notAbsolute } = props;
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
  return (
    <Box sx={outerStyle}>
      <IconButton onClick={handleClick}>
        <HelpOutline />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
      >
        <Box sx={{ m: 1, p: 1, maxWidth: 400 }}>
          {info.map((v) => {
            return (
              <Box key={v} sx={{ mb: 1 }}>
                <Typography>{v}</Typography>
              </Box>
            );
          })}
        </Box>
      </Popover>
    </Box>
  );
}
