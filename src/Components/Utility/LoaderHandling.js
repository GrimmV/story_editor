import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoaderHandling(props) {
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
      <Typography>{component} Daten werden geladen...</Typography>
      <CircularProgress />
    </Box>
  );
}
