import { Replay } from "@mui/icons-material";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import GPTRecommender from "./GPTRecommender";
import { useQuery } from "react-query";
import { getRecommendation } from "../../../fetching/gpt";

export default function GPTRecommenderWrapper(props) {

    const { storyId, frameId } = useParams();

    const {gptSetup, conversationHistory, bubblesRefetch, bubbleId} = props;
        
    const {
        data: gpt,
        isError,
        // isLoading,
        isFetching,
        refetch
    } = useQuery(["gpt-recommendation", storyId, frameId], () =>
        getRecommendation(gptSetup, conversationHistory)
    );

    return(
        <Paper sx={{ m: 2, p: 1 }}>
            <Box sx={{display: "flex", justifyContent: "space-between", mb: 1}}>
                <Typography variant="h3">Chat-GPT Unterstützung</Typography>
                <Button onClick={refetch} endIcon=<Replay/> color="primary">Erneuern</Button>
            </Box>
            <GPTRecommender
                gpt={gpt} isError={isError} conversationHistory={conversationHistory} isFetching={isFetching}
                bubblesRefetch={bubblesRefetch} bubbleId={bubbleId}
            />
        </Paper>
    )
}