import { SaveAlt } from "@mui/icons-material";
import { Box, CircularProgress, IconButton, Paper, Typography } from "@mui/material";
import { saveBubbleContent } from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";

export default function GPTRecommender(props) {
  const { gpt, isError, isFetching, bubblesRefetch, bubbleId } = props;

  const token = getToken()

  const paperStyle = {
    p: 1,
    mb: 1,
    bgcolor: "secondary.lightest"
  };

  const saveContent = () => {
    saveBubbleContent(token, bubbleId, gpt.Text).then(() => {
        bubblesRefetch()
    });;
}

  if (isFetching)
    return (
      <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Typography>
          Empfehlung wird berechnet
        </Typography>
        <CircularProgress/>
      </Box>
    );
  if (isError)
    return (
      <Box sx={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#FFE0DF"}}>
        <Typography>
          Leider ist ein Fehler aufgetreten und es konnte keine Empfehlung
          bereitgestellt werden.
        </Typography>
      </Box>
    );
  if (!gpt.Text)
    return (
      <Box sx={{width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", bgcolor: "#FFE0DF"}}>
        <Typography>
          Leider ist ein Fehler aufgetreten und es konnte keine Empfehlung
          bereitgestellt werden.
        </Typography>
      </Box>
    );


  return (
    <Box>
      <Box sx={paperStyle}>
        <Typography>Person: {gpt.Charaktername}</Typography>
      </Box>
      <Box sx={paperStyle}>
        <Typography>Ort: {gpt.Ort}</Typography>
      </Box>
      <Box sx={[paperStyle, {display: "flex", justifyContent: "space-between", alignItems: "center"}]}>
        <Typography>Vorschlag: {gpt.Text}</Typography>
          <IconButton onClick={saveContent} color="primary"><SaveAlt/></IconButton>
      </Box>
      <Box sx={paperStyle}>
        <Typography>Gedanken: {gpt.Gedanken[0] ? gpt.Gedanken : "Keine"}</Typography>
      </Box>
    </Box>
  )
}
