import React, { useState } from 'react';
import { Typography, Box, Tabs, Tab } from '@mui/material';
import FrameHandler from './FrameHandler';
import CharacterHandler from './CharacterHandler';
import BubbleHandler from './BubbleHandler';
import ChoiceHandler from './ChoiceHandler';

export default function ChooseComponents(props) {

    const {frame, character, bubble, choices, frameIds, refetches} = props;

    const [activeTab, setActiveTab] = useState("general")

    const handleTabChange = (e, newValue) => {
        setActiveTab(newValue);
    };
    
    return (
        <Box sx={{float: "left", mt: 2}}>
            <Typography sx={{mb: 2}} variant="h3" align="center">
                Elemente Bearbeiten
            </Typography>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{m: 3}}>
                <Tab label="Allgemein" value="general"/>
                <Tab label="Charakter" value="character" />
                <Tab label="Sprechblase" value="bubble" />
                <Tab label="Entscheidung" value="choice" />
            </Tabs>
            <Box sx={{position: "relative"}}>
                {activeTab === "general" && 
                    <FrameHandler 
                        frame={frame}
                        frameIds={frameIds}
                        refetch={refetches["framesRefetch"]}
                    />
                }
                {activeTab === "character" && 
                    <CharacterHandler 
                        character={character}
                        refetch={refetches.charactersRefetch}
                    />
                }
                {activeTab === "bubble" && 
        
                    <BubbleHandler 
                        bubble={bubble}
                        refetch={refetches.bubblesRefetch}
                    />
                }
                {activeTab === "choice" && 
                    <ChoiceHandler 
                        choices={choices}
                        refetch={refetches.choicesRefetch}
                    />
                }

            </Box>
        </Box>
    )
}