import { Box, CircularProgress, Paper, Typography } from "@mui/material";
import GPTRecommender from "./GPTRecommender";

export default function GPTRecommenderWrapper(props) {

    const {gptSetup, gptSetupIsLoading, gptSetupError, conversationHistory, bubblesRefetch, bubbleId} = props;

    let errorGptSetup = {}
    
    if (gptSetupIsLoading) {
        return (
          <Box sx={{width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <Typography>
              Einstellungen werden geladen
            </Typography>
            <CircularProgress/>
          </Box>
        );
    } 
    if (gptSetupError) {
        errorGptSetup["workArea"] = "";
        errorGptSetup["employer"] = "";
        errorGptSetup["employerInfo"] = "";
        errorGptSetup["employee"] = "";
        errorGptSetup["employeeInfo"] = "";
    }

    return(
        <Paper sx={{ m: 2, p: 1 }}>
            <GPTRecommender
                conversationHistory={conversationHistory} gptSetup={gptSetupError ? errorGptSetup : gptSetup}
                bubblesRefetch={bubblesRefetch} bubbleId={bubbleId}
            />
        </Paper>
    )
}