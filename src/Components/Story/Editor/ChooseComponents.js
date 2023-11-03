import React, { useState } from "react";
import { Box } from "@mui/material";
import FrameHandler from "./FrameHandler";
import CharacterHandler from "./CharacterHandler";
import BubbleHandler from "./BubbleHandler";
import ChoiceHandler from "./ChoiceHandler";
import { useParams } from "react-router-dom";
import GPTRecommenderWrapper from "./GPTRecommendWrapper";
import ChatPopover from "../Utils/ChatPopover";

export default function ChooseComponents(props) {
  const {
    conversationHistory,
    isLastFrame,
    frame,
    character,
    bubble,
    choices,
    frameIds,
    refetches,
    gptSetup,
    gptSetupIsLoading,
    gptSetupError,
    gptActive,
  } = props;
  const { frameId } = useParams();

  console.log(conversationHistory);

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
    {
        gptActive &&
        <ChatPopover>
            <GPTRecommenderWrapper
            gptSetup={gptSetup}
            gptSetupIsLoading={gptSetupIsLoading}
            gptSetupError={gptSetupError}
            conversationHistory={conversationHistory}
            bubblesRefetch={refetches.bubblesRefetch}
            bubbleId={bubble.id}
            />
        </ChatPopover>
    }
      <Box>
        <FrameHandler
          frame={frame}
          frameIds={frameIds}
          refetch={refetches.framesRefetch}
        />
        <CharacterHandler
          character={character}
          refetch={refetches.charactersRefetch}
        />

        <BubbleHandler
          frameId={frameId}
          bubble={bubble}
          refetch={refetches.bubblesRefetch}
        />
        <ChoiceHandler
          isLastFrame={isLastFrame}
          choices={choices}
          refetch={refetches.choicesRefetch}
          refetchFrames={refetches.framesRefetch}
          refetchBubbles={refetches.bubblesRefetch}
          refetchCharacters={refetches.charactersRefetch}
        />
      </Box>
    </Box>
  );
}
