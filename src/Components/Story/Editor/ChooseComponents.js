import React, { useState } from 'react';
import { Box } from '@mui/material';
import FrameHandler from './FrameHandler';
import CharacterHandler from './CharacterHandler';
import BubbleHandler from './BubbleHandler';
import ChoiceHandler from './ChoiceHandler';
import { useParams } from 'react-router-dom';
import GPTRecommenderWrapper from './GPTRecommendWrapper';
import ChatPopover from '../Utils/ChatPopover';

export default function ChooseComponents(props) {

    const {conversationHistory, frame, character, bubble, choices, frameIds, refetches, gptSetup} = props;
    const { storyId, frameId } = useParams();

    console.log(conversationHistory);
    
    return (
        <Box sx={{display: "flex", flexDirection:"column", alignItems: "center"}}>
            <ChatPopover>
                <GPTRecommenderWrapper gptSetup={gptSetup} conversationHistory={conversationHistory} bubblesRefetch={refetches.bubblesRefetch} bubbleId={bubble.id}/>
            </ChatPopover>
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
                        choices={choices}
                        refetch={refetches.choicesRefetch}
                    />

            </Box>
        </Box>
    )
}