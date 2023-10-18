import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Typography, Slider, Box, TextField } from '@mui/material';
import { addChoice, changePosition, deleteChoices, removeChoice } from '../../../fetching/update';
import { getToken } from '../../../utils/getToken';
import { useParams } from 'react-router-dom';
import { Delete } from '@mui/icons-material';
import ChoiceAnswerText from './ChoiceAnswerText';

export default function ChoiceHandler(props) {

    const token = getToken()
    const {storyId, frameId} = useParams()

    const {choices, refetch} = props;

    const {x, y} = choices ? choices.position : {x: 0, y: 0};
    const existingAnswers = choices ? choices.answers.map(v => v.answer.de) : []

    const [tmpPos, setTmpPos] = useState({x: x, y: y})
    // State to hold the value of the text field
    const [answer, setAnswer] = useState('');

    // Function to handle changes in the text field
    const handlerAnswerChange = (event) => {
        setAnswer(event.target.value);
    };

    const moveChoices = (xPos, yPos) => {
        changePosition(token, "choices", choices.id, xPos, yPos).then(() => {
            refetch()
        });
    }

    const updatePosition = (xPos, yPos) => {
        setTmpPos({x: xPos, y: yPos})
    }
    
    const addAnswerOption = () => {
        addChoice(token, choices ? choices.id : "", frameId, storyId, answer).then(() => {
            refetch()
        });
    }
    const removeChoices = () => {
        deleteChoices(token, choices ? choices.id : "").then(() => {
            refetch()
        });
    }

    // Function to determine whether the value is invalid
    const isInvalidValue = () => {
        return answer === '' || existingAnswers.includes(answer);
      };
    
      // Function to generate appropriate error message
      const getErrorMessage = () => {
        if (answer === '') return 'Value cannot be empty';
        if (existingAnswers.includes(answer)) return 'Value already exists in the list';
        return '';
      };

    return (
        <Box>
            <Box sx={{display: "flex", flexDirection: "column", justifyContent:"space-around", mb: 1}}>
                <ChoiceAnswerText isInvalidValue={isInvalidValue} getErrorMessage={getErrorMessage}
                    text={answer} handleChange={handlerAnswerChange}
                />
                <Button
                    onClick={addAnswerOption}
                    variant="contained"
                    startIcon={<AddIcon />}
                    disabled={isInvalidValue()}
                >
                    Auswahl
                </Button>
                {
                    choices &&
                    <Button onClick={removeChoices}
                        variant="contained"
                        startIcon={<Delete/>}
                        color="error"
                    >
                        Löschen
                    </Button>
                }
            </Box>
            {
                choices &&
            <Box>
                <Box>
                    <Typography>Y-Position</Typography>
                    <Slider max={100}
                        value={tmpPos.y} onChange={(event, newValue) => {updatePosition(x, newValue)}} aria-labelledby="continuous-slider" 
                        onChangeCommitted={(event, newValue) => moveChoices(x, newValue)}
                    />
                </Box>
                <Box>
                    <Typography>X-Position</Typography>
                    <Slider max={100}
                        value={tmpPos.x} onChange={(event, newValue) => {updatePosition(newValue, y)}} aria-labelledby="continuous-slider" 
                        onChangeCommitted={(event, newValue) => {moveChoices(newValue, y)}}
                    />
                </Box>
            </Box>
            }
        </Box>
    )
}