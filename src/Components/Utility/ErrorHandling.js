import { Box, Typography } from "@mui/material";

export default function ErrorHandling(props) {
  const { component } = props;

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography color="error">
        Leider ist ein Fehler beim Aufrufen von {component} aufgetreten. Versuch
        die Seite neu zu laden oder benachrichtige den System Administrator.
      </Typography>
    </Box>
  );
}
