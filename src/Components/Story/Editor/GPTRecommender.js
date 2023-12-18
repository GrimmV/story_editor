import { SaveAlt } from "@mui/icons-material";
import {
  Box,
  CircularProgress,
  IconButton,
  Typography,
} from "@mui/material";
import { saveBubbleContent } from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";
import { getRecommendation } from "../../../fetching/gpt";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import uploadClick from "../../../fetching/uploadData";
import { shortenFrameId } from "../../Utility/Helper";
import DropDownButton from "../../Utility/DropDownButton";
import { useState } from "react";

export default function GPTRecommender(props) {
  const { conversationHistory, gptSetup, bubblesRefetch, bubbleId } = props;
  const { storyId, frameId } = useParams();

  const token = getToken();

  const [characterChoice, setCharacterChoice] = useState(null);

  const paperStyle = {
    p: 1,
    mb: 1,
    bgcolor: "secondary.lightest",
  };

  const {
    data: gpt,
    isError,
    isFetching,
    refetch
  } = useQuery(["gpt-recommendation", storyId, frameId], () =>
    getRecommendation(gptSetup, conversationHistory, characterChoice)
  );

  const saveContent = () => {
    saveBubbleContent(token, bubbleId, gpt.Text).then(() => {
      bubblesRefetch();
      uploadClick("gpt", `empfehlung nutzen ${shortenFrameId(frameId)}: ${gpt.Text}`)
    });
  };

  let output;

  if (isFetching)
    output =  (
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
  else if (isError)
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
  else if (!gpt.Text) {
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
  }
  else {
    output = (
      <Box>
        <Box sx={paperStyle}>
          <Typography>Person: {gpt.Charaktername}</Typography>
        </Box>
        <Box sx={paperStyle}>
          <Typography>Ort: {gpt.Ort}</Typography>
        </Box>
        <Box
          sx={[
            paperStyle,
            {
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            },
          ]}
        >
          <Typography>Vorschlag: {gpt.Text}</Typography>
          <IconButton onClick={saveContent} color="primary">
            <SaveAlt />
          </IconButton>
        </Box>
        <Box sx={paperStyle}>
          <Typography>
            Gedanken: {gpt.Gedanken[0] ? gpt.Gedanken : "Keine"}
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
        <Typography variant="h3">Chat-GPT Unterstützung</Typography>
        <Box sx={{display: "flex", flexDirection: "column", alignItems: "left"}}>
        <DropDownButton text="Erneuern" characterOptions={[gptSetup["employee"], gptSetup["employer"]]}
          characterChoice={characterChoice} setCharacterChoice={setCharacterChoice} action={refetch}
        />
        {
          characterChoice &&
          <Typography>...mit {characterChoice}</Typography>
        }

        </Box>
      </Box>
      {output}
    </Box>
  )
}
