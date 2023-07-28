import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography, Slider, Box } from '@mui/material';

export default function ChoiceHandler(props) {


    // if (!props.choices) {
    //     return null;
    // }

    const {x, y} = props.choices ? props.choices.position : {x: 0, y: 0};

    const defaultAnswer = "Neue Antwort"

    const moveChoices = (xPos, yPos, didCommit) => {
        props.moveChoices(xPos, yPos, didCommit);
    }
    
    const addAnswerOption = () => {
        props.addChoice(defaultAnswer);
    }

    return (
        <Box>
            <Box sx={{display: "flex", justifyContent:"left", mb: 1}}>
                <Button
                    onClick={addAnswerOption}
                    variant="contained"
                    startIcon={<AddIcon />}
                >
                    Auswahl
                </Button>
            </Box>
            <Box>
                <Box>
                    <Typography>Y-Position</Typography>
                    <Slider max={100}
                        value={y} onChange={(event, newValue) => {moveChoices(x, newValue, false)}} aria-labelledby="continuous-slider" 
                        onChangeCommitted={(event, newValue) => moveChoices(x, newValue, true)}
                    />
                </Box>
                <Box>
                    <Typography>X-Position</Typography>
                    <Slider max={100}
                        value={x} onChange={(event, newValue) => {moveChoices(newValue, y, false)}} aria-labelledby="continuous-slider" 
                        onChangeCommitted={(event, newValue) => {moveChoices(newValue, y, true)}}
                    />
                </Box>
            </Box>
        </Box>
    )
}