import { Box, Grid, Typography } from "@mui/material";
import ChooseFrameBar from "./ChooseFrameBar";
// import EditorArea from "./EditorArea"
// import ChooseComponents from "./ChooseComponents"
import { getToken } from "../../../utils/getToken";
import { useParams } from "react-router-dom";
import {
  fetchBubblesOf,
  fetchCharactersOf,
  fetchChoicesOf,
  fetchFramesOf,
  fetchStory,
} from "../../../fetching/retrieve";
import { useQuery } from "react-query";
import { fetchLoadingHandler } from "../../../utils/fetchLoadingHandler";
import { createFrame } from "../../../fetching/update";
import { fetchErrorHandler } from "../../../utils/fetchErrorHandler";
import { useEffect } from "react";
import EditorArea from "./EditorArea";
import ChooseComponents from "./ChooseComponents";

export default function Editor(props) {
  const token = getToken();

  const { storyId, frameId } = useParams();

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

  const addFrame = () => {
    createFrame(token, storyId).then(() => {
      framesRefetch();
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

  const activeBubble = bubbles.find((v) => v.frameId === frameId);
  const activeCharacter = characters.find((v) => v.frameId === frameId);
  const activeChoices = choices.find((v) => v.frameId === frameId);
  const activeFrame = frames.find((v) => v.id === frameId);

  const gridRenderer = () => {
    if (frameId) {
      return (
        <Grid sx={{ p: 3 }} container>
          <Grid xs={3} item>
            <ChooseFrameBar
              frames={frames}
              frameId={frameId}
              addNewFrame={addFrame}
              storyId={storyId}
            />
          </Grid>
          <Grid xs={5} item>
            <EditorArea
              choices={activeChoices}
              character={activeCharacter}
              bubble={activeBubble}
              frame={activeFrame}
            />
          </Grid>
          <Grid xs={4} item>
            <ChooseComponents
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
              frameId={frameId}
              addNewFrame={addFrame}
              storyId={storyId}
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
      {gridRenderer()}
    </Box>
  );
}
