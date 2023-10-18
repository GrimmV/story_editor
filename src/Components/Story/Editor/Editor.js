import { Box, Grid, Typography } from "@mui/material";
import ChooseFrameBar from "./ChooseFrameBar";
// import EditorArea from "./EditorArea"
// import ChooseComponents from "./ChooseComponents"
import { getToken } from "../../../utils/getToken";
import { useNavigate, useParams } from "react-router-dom";
import {
  fetchBubblesOf,
  fetchCharactersOf,
  fetchChoicesOf,
  fetchFramesOf,
  fetchStory,
} from "../../../fetching/retrieve";
import { useQuery } from "react-query";
import { fetchLoadingHandler } from "../../../utils/fetchLoadingHandler";
import { changeChoiceNextFrame, createFrame, deleteFrame, moveFrame } from "../../../fetching/update";
import { fetchErrorHandler } from "../../../utils/fetchErrorHandler";
import EditorArea from "./EditorArea";
import ChooseComponents from "./ChooseComponents";
import { getConvHistoryUntilNow } from "../../../utils/getConvHistoryUntilNow";
import GPTSetup from "./GptSetup";
import { toStoryEditor } from "../../../routing/routes";
import { useState } from "react";

export default function Editor(props) {
  const token = getToken();

  const { storyId, frameId } = useParams();

  const navigate = useNavigate();

  const [gptSetup, setGptSetup] = useState({
    workArea: "", employee: "", employeeInfo: "", employer: "", employerInfo: ""
  })

  const {
    data: story,
    isError: storyError,
    isLoading: storyIsLoading,
  } = useQuery(["story", storyId], () => fetchStory(storyId));
  const {
    data: frames,
    isError: framesError,
    isLoading: framesIsLoading,
    refetch: framesRefetch,
  } = useQuery(["frames", storyId], () => fetchFramesOf(storyId));
  const {
    data: bubbles,
    isError: bubblesError,
    isLoading: bubblesIsLoading,
    refetch: bubblesRefetch,
  } = useQuery(["bubbles", storyId], () => fetchBubblesOf(storyId));
  const {
    data: characters,
    isError: charactersError,
    isLoading: charactersIsLoading,
    refetch: charactersRefetch,
  } = useQuery(["characters", storyId], () => fetchCharactersOf(storyId));
  const {
    data: choices,
    isError: choicesError,
    isLoading: choicesIsLoading,
    refetch: choicesRefetch,
  } = useQuery(["choices", storyId], () => fetchChoicesOf(storyId));

  const addFrame = (prevFrameId) => {
    return createFrame(token, storyId, prevFrameId).then(response => {
      framesRefetch();
      return response.id
    }).then(v => {
      bubblesRefetch();
      charactersRefetch();
      choicesRefetch();
    });
  };

  const removeFrame = (selectedFrameId) => {
    return deleteFrame(token, selectedFrameId).then(response => {
      framesRefetch();
      if (selectedFrameId === frameId) {
        navigate(toStoryEditor(storyId))
      }
    });
  };

  const moveFramePosition = (sourceFrameId, newPrevFrameId) => {
    return moveFrame(token, sourceFrameId, newPrevFrameId).then(response => {
      framesRefetch();
      return response.id
    });
  };
  
  const addNextFrameToChoice = (choiceId, answerId, nextFrameId) => {
    changeChoiceNextFrame(token, choiceId, answerId, nextFrameId).then(() => {
      choicesRefetch();
    });
  };

  const loadingResult = fetchLoadingHandler(
    [framesIsLoading, storyIsLoading, charactersIsLoading, bubblesIsLoading, choicesIsLoading],
    ["Frames", "Story", "Characters", "Sprechblasen", "Entscheidungen"]
  );
  const errorResult = fetchErrorHandler(
    [framesError, storyError, charactersError, bubblesError, choicesError],
    ["Frames", "Story", "Characters", "Sprechblasen", "Entscheidungen"]
  );

  if (loadingResult) return loadingResult;
  if (errorResult) return errorResult;
  
  const conversationHistory = getConvHistoryUntilNow(frames, bubbles, frameId);

  const activeBubble = bubbles.find((v) => v.frameId === frameId);
  const activeCharacter = characters.find((v) => v.frameId === frameId);
  const activeChoices = choices.find((v) => v.frameId === frameId);
  const activeFrame = frames.find((v) => v.id === frameId);

  const gridRenderer = () => {
    if (frameId) {
      return (
        <Grid sx={{ p: 3 }} container>
          <Grid xs={4} item>
            <ChooseFrameBar
              bubbles={bubbles}
              frames={frames}
              addNewFrame={addFrame}
              moveFrame={moveFramePosition}
              choices={choices}
              addNextFrameToChoice={addNextFrameToChoice}
              removeFrame={removeFrame}
            />
          </Grid>
          <Grid xs={4} item>
            <EditorArea
              choices={activeChoices}
              character={activeCharacter}
              bubble={activeBubble}
              frame={activeFrame}
            />
          </Grid>
          <Grid xs={4} item>
            <ChooseComponents
              conversationHistory={conversationHistory}
              gptSetup={gptSetup}
              frame={activeFrame}
              character={activeCharacter}
              bubble={activeBubble}
              choices={activeChoices}
              frameIds={frames.map(v => v.id)}
              refetches={{
                framesRefetch: framesRefetch, 
                charactersRefetch: charactersRefetch, 
                bubblesRefetch: bubblesRefetch,
                choicesRefetch: choicesRefetch
            }}
            />
          </Grid>
        </Grid>
      );
    } else {
      return (
        <Grid sx={{ p: 3 }} container>
          <Grid xs={3} item>
            <ChooseFrameBar
              frames={frames}
              addNewFrame={addFrame}
              moveFrame={moveFramePosition}
              choices={choices}
              addNextFrameToChoice={addNextFrameToChoice}
            />
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box>
      <Typography variant="h1" align="center">
        Story Editor
      </Typography>
      <Typography variant="h2" align="center">
        {story.title["de"]}
      </Typography>
      <GPTSetup gptSetup={gptSetup} setGptSetup={setGptSetup}/>
      {gridRenderer()}
    </Box>
  );
}
