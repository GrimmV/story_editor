import { AppBar, Toolbar, Button, Box, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toStoryOverview } from "../../routing/routes";
import uploadClick from "../../fetching/uploadData";

export default function Menu(props) {
  const navigate = useNavigate();

  const logout = () => {
    uploadClick("login", "ausgeloggt");
    props.logout();
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate(toStoryOverview)}
        >
          Meine Geschichten
        </Button>
        <Typography variant="h1">Story Editor</Typography>
        <Button variant="contained" color="error" onClick={logout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  );
}
