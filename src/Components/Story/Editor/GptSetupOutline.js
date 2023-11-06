import {
  ChangeCircleOutlined,
  CloudDone,
  Send,
} from "@mui/icons-material";
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";
import { useState } from "react";
import { getOutlineRecommendation } from "../../../fetching/gpt";
import uploadClick from "../../../fetching/uploadData";

export default function GptSetupOutline(props) {
  const { gptSetup, outline, setOutline, isFetching, gptActive } = props;
  const paperStyle = {
    p: 1,
    mb: 1,
    bgcolor: "secondary.lightest",
  };

  const [gptOutline, setGptOutline] = useState(null);
  const [isFetchingGpt, setIsFetchingGpt] = useState(false);
  const [isErrorGpt, setIsErrorGpt] = useState(false);

  const [localOutline, setLocalOutline] = useState(outline);

  const setTheOutline = () => {
    if (outline === localOutline) return;
    setOutline(localOutline)
  };

  const computeOutlineIcon = () => {
    if (localOutline === outline) return <CloudDone color="success" />;
    else return <ChangeCircleOutlined color="error" />;
  };

  const handleTransfer = () => {

    setLocalOutline(gptOutline?.Kontext + gptOutline?.Entscheidungspunkt);
    uploadClick("gpt/outline", `outline Empfehlung genutzt: ${gptOutline?.Kontext + gptOutline?.Entscheidungspunkt}`);
  };

  const handleOutlineRecommendation = () => {
    setIsFetchingGpt(true);
    setIsErrorGpt(false);
    getOutlineRecommendation(gptSetup)
      .then((resp) => {
        setGptOutline(resp);
      })
      .then(() => {
        setIsFetchingGpt(false);
      })
      .catch((error) => {
        console.log(error)
        setIsErrorGpt(true);
        setIsFetchingGpt(false);
      });
  };

  let output;

  if (!gptOutline && !isFetchingGpt && !isErrorGpt)
    output = (
      <Typography>
        Generiere einen möglichen Kontext für die Geschichte.
      </Typography>
    );
  else if (isFetchingGpt)
    output = (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Empfehlung wird berechnet</Typography>
        <CircularProgress />
      </Box>
    );
  else if (isErrorGpt || !gptOutline?.Kontext) {
    output = (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          bgcolor: "#FFE0DF",
        }}
      >
        <Typography>
          Leider ist ein Fehler aufgetreten und es konnte keine Empfehlung
          bereitgestellt werden.
        </Typography>
      </Box>
    );
  } else {
    output = (
      <Box>
        <Box sx={paperStyle}>
          <Typography>{gptOutline.Kontext}</Typography>
          <Typography>{gptOutline.Entscheidungspunkt}</Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Paper
        sx={{
          p: 2,
          bgcolor: "secondary.lightest",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>
          Lege fest, in welcher Situation sich die Charaktere befinden, die du
          im Comic beschreibst.
        </Typography>
        <Typography sx={{ fontWeight: 500 }}>
          Halte dich möglichst kurz und überleg dir eine grobe
          Entscheidungs-Situation.
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Typography variant="h3">Geschichts-Kontext</Typography>
            <Paper sx={{ width: 400 }}>
              <TextField
                disabled={isFetching}
                multiline
                sx={{ width: "100%" }}
                value={localOutline}
                onChange={(e) => setLocalOutline(e.target.value)}
                InputProps={{
                  endAdornment: computeOutlineIcon(),
                }}
              />
            </Paper>
            <Button
              sx={{ width: "100%" }}
              variant="contained"
              onClick={setTheOutline}
              disabled={localOutline === outline}
            >
              Kontext Aktualisieren
            </Button>
          </Box>
          {gptActive && (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Button
                disabled={!gptOutline}
                variant="contained"
                color="secondary"
                sx={{ mr: 1, ml: 1, height: "fit-content" }}
                startIcon={<Send sx={{ transform: "rotate(180deg)" }} />}
                onClick={handleTransfer}
              >
                Übertragen
              </Button>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3">Empfehlung</Typography>
                <Paper
                  sx={{
                    p: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    width: 400,
                  }}
                >
                  {output}
                </Paper>
                <Button
                  sx={{ width: "100%" }}
                  variant="contained"
                  onClick={handleOutlineRecommendation}
                  disabled={isFetchingGpt}
                >
                  Empfehlung Generieren
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Paper>
    </Box>
  );
}
