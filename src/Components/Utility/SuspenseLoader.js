import { Box, CircularProgress, Typography } from "@mui/material";

export default function SuspenseLoader() {

    return(
        <Box sx={{position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", display: "flex", 
                alignItems: "center", justifyContent: "center", flexDirection: "column"
                }}>
            <Typography>Willkommen :-)</Typography>
            <CircularProgress/>
        </Box>
    )
}