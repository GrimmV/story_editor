import { Box, Button, Grid, Typography } from "@mui/material";
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
import { changeChoiceNextFrame, createFrame, deleteFrame, getSubstoryGPTinfo } from "../../../fetching/update";
import { fetchErrorHandler } from "../../../utils/fetchErrorHandler";
import EditorArea from "./EditorArea";
import ChooseComponents from "./ChooseComponents";
import { getConvHistoryUntilNow } from "../../../utils/getConvHistoryUntilNow";
import GPTSetup from "./GptSetup";
import { toStoryEditor } from "../../../routing/routes";
import { useState } from "react";
import organizeFrames from "../../../utils/orderFrames";
import findKeyForFrameId from "../../../utils/findKeyForFrameId";
import MainSim from "../Simulator/MainSim";
import { Slideshow } from "@mui/icons-material";
import { getGptConfig } from "../../../fetching/gpt";

export default function Editor(props) {
  const token = getToken();

  const { storyId, frameId } = useParams();

  const navigate = useNavigate();

  const [simModalOpen, setSimModalOpen] = useState(false);


  const closeSimModal = () => {
    setSimModalOpen(false);
  }

  const openSimModal = () => {
    setSimModalOpen(true);
  }

  const {
    data: story,
    isError: storyError,
    isLoading: storyIsLoading,
  } = useQuery(["story", storyId], () => fetchStory(storyId));
  const {
    data: gptConfig,
    isError: gptConfigError,
    isLoading: gptConfigIsLoading,
  } = useQuery(["gptConfig"], getGptConfig);
  const {
    data: gptSetup,
    isError: storyGPTinfoError,
    isLoading: storyGPTinfoIsLoading,
    isFetching: storyGPTinfoIsFetching,
    refetch: setupRefetch
  } = useQuery(["gptSetup", storyId], () => getSubstoryGPTinfo(storyId));
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
  
  const addNextFrameToChoice = (choiceId, answerId, nextFrameId) => {
    changeChoiceNextFrame(token, choiceId, answerId, nextFrameId).then(() => {
      choicesRefetch();
    });
  };

  const loadingResult = fetchLoadingHandler(
    [framesIsLoading, storyIsLoading, charactersIsLoading, bubblesIsLoading, choicesIsLoading, gptConfigIsLoading],
    ["Frames", "Story", "Characters", "Sprechblasen", "Entscheidungen", "Anderes"]
  );
  const errorResult = fetchErrorHandler(
    [framesError, storyError, charactersError, bubblesError, choicesError, gptConfigError],
    ["Frames", "Story", "Characters", "Sprechblasen", "Entscheidungen", "Anderes"]
  );

  if (loadingResult) return loadingResult;
  if (errorResult) return errorResult;

  const {gpt: gptActive, temperatureActive: tempActive} = gptConfig;

  const conversationHistory = getConvHistoryUntilNow(frames, bubbles, choices, frameId);
  
  const orderedFrames = organizeFrames(frames, bubbles, choices);
  const titleFrame = findKeyForFrameId(orderedFrames, frameId)
    ? findKeyForFrameId(orderedFrames, frameId)
    : "first";

  const isLastFrame = orderedFrames[titleFrame].length - 1 === orderedFrames[titleFrame].findIndex(frame => frame.frame.id === frameId)

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
              orderedFrames={orderedFrames}
              titleFrame={titleFrame}
              addNewFrame={addFrame}
              choices={choices}
              addNextFrameToChoice={addNextFrameToChoice}
              removeFrame={removeFrame}
            />
          </Grid>
          <Grid xs={4} item>
            <EditorArea
              refetchChoices={choicesRefetch}
              choices={activeChoices}
              character={activeCharacter}
              bubble={activeBubble}
              frame={activeFrame}
            />
          </Grid>
          <Grid xs={4} item>
            <ChooseComponents
              isLastFrame={isLastFrame}
              orderedFrames={orderedFrames}
              conversationHistory={conversationHistory}
              gptActive={gptActive}
              gptSetup={gptSetup}
              gptSetupIsLoading={storyGPTinfoIsFetching || storyGPTinfoIsLoading}
              gptSetupError={storyGPTinfoError}
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
              orderedFrames={orderedFrames}
              titleFrame={titleFrame}
              frames={frames}
              addNewFrame={addFrame}
              choices={choices}
              addNextFrameToChoice={addNextFrameToChoice}
            />
          </Grid>
        </Grid>
      );
    }
  };

  return (
    <Box sx={{display: "flex", flexDirection: "column", alignItems: "center"}}>
      <Typography variant="h1" align="center">
        {story.title["de"]}
      </Typography>
    <Box sx={{ width: "100%", height: "100%", bgcolor: "lightgrey", display: "flex", alignItems: "center", justifyContent: "center", mt: 2}}>
      <Typography variant="h3">Meta Informationen</Typography>
    </Box>
    <GPTSetup
      storyId={storyId}
      gptSetup={gptSetup}
      isFetching={storyGPTinfoIsFetching}
      isError={storyGPTinfoError}
      refetch={setupRefetch}
      gptActive={gptActive}
      tempActive={tempActive}
    />
    <Box sx={{ width: "100%", height: "100%", bgcolor: "lightgrey", display: "flex", alignItems: "center", justifyContent: "center", mt: 1, mb: 2}}>
      <Typography variant="h3">Geschichte schreiben</Typography>
    </Box>
      <Box>
        <Button onClick={openSimModal} variant="contained" startIcon=<Slideshow/>>Simulation</Button>
      </Box>
      {gridRenderer()}
      <MainSim
        modalOpen={simModalOpen}
        closeModal={closeSimModal}
        frames={frames}
        choices={choices}
        bubbles={bubbles}
        characters={characters}
      />
    </Box>
  );
}
