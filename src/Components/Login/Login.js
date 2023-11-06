import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
} from "@mui/material";
import { login } from "../../fetching/auth";
import uploadClick from "../../fetching/uploadData";

export default function Login(props) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");  
  const [checked, setChecked] = useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const [passwordWasWrong, setPasswordWasWrong] = useState(false);
  const [somethingElseWrong, setSomethingElseWrong] = useState(false);

  const handleLogin = () => {
    login(name, password)
      .then((response) => {
        if (response.status === 403) {
          setPasswordWasWrong(true);
          throw new Error("Wrong credentials");
        } else if (response.ok) {
          return response.json();
        } else {
          setSomethingElseWrong(true);
          throw new Error("Unkown Error");
        }
      })
      .then((response) => response.jwt)
      .then((jwt) => {
        localStorage.setItem("jwt", jwt);
        localStorage.setItem("user", name);
        props.setIsLoggedIn();
        uploadClick("login", "eingeloggt");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        m: 10,
      }}
    >
      <Paper sx={{ display: "flex", flexDirection: "column", width: "20rem" }}>
        <TextField
          sx={{ m: 2, mb: 1 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="filled"
          placeholder="Nutzername"
          label="Nutzername"
        />
        <TextField
          sx={{ mt: 0, mb: 0, ml: 2, mr: 2 }}
          variant="filled"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          label="Password"
        />
        {passwordWasWrong && (
          <Typography sx={{ m: 2, mb: 1, color: "red" }}>
            Falsche Login-Daten
          </Typography>
        )}
        {somethingElseWrong && (
          <Typography sx={{ m: 2, mb: 1, color: "red" }}>
            Ein unbekannter Fehler ist aufgetreten. Bitte System-Admin
            kontaktieren.
          </Typography>
        )}
        <Box sx={{display: "flex", alignItems: "center", justifyContent: "center", m: 2}}>
          <Checkbox
            checked={checked}
            onChange={handleChange}
            inputProps={{ "aria-label": "checkbox-data-usage" }}
            sx={{mr: 1}}
          />
            <Typography>Ich stimme zu, dass die anonymen Nutzungsdaten für Forschungszwecke genutzt werden dürfen.</Typography>
        </Box>
        <Button sx={{ m: 2 }} variant="contained" onClick={handleLogin} disabled={!checked}>
          Einloggen
        </Button>
      </Paper>
    </Box>
  );
}
