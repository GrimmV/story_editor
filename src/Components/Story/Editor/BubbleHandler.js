import React, {useState} from 'react';
import { Typography, Slider, TextField, Box, Button } from '@mui/material';
import { changePosition, saveBubbleContent, saveBubbleFontsize, saveBubbleWidth } from '../../../fetching/update';
import { getToken } from '../../../utils/getToken';


export default function BubbleHandler(props) {

    const token = getToken()

    const {bubble, refetch} = props;

    const xPos = bubble.position.x;
    const yPos = bubble.position.y;
    const width = bubble.width;
    const fontsize = bubble.fontSize;

    const [tmpContent, setTmpContent] = useState(bubble.content ? bubble.content["de"] : "");
    
    const [tmpWidth, setTmpWidth] = useState(width);
    const [tmpPos, setTmpPos] = useState(bubble.position);
    const [tmpFontsize, setTmpFontsize] = useState(fontsize);

    const savePosition = (newX, newY) => {
        changePosition(token, "bubble", bubble.id, newX, newY).then(() => {
            refetch()
        });
    }
    const updatePosition = (newX, newY) => {
        setTmpPos({x: newX, y: newY});
    }

    const saveWidth = (newWidth) => {
        saveBubbleWidth(token, bubble.id, newWidth).then(() => {
            refetch()
        });;
    }    
    const updateWidth = (newWidth) => {
        setTmpWidth(newWidth);
    }

    const saveFontsize = (newFontsize) => {
        saveBubbleFontsize(token, bubble.id, newFontsize).then(() => {
            refetch()
        });;
    }
    const updateFontsize = (newFontsize) => {
        setTmpFontsize(newFontsize);
    }

    const saveContent = () => {
        setTmpContent("");
        saveBubbleContent(token, bubble.id, tmpContent).then(() => {
            refetch()
        });;
    }
    
    if (!props.bubble) return;

    return(
        <Box>
            <Box sx={{mb: 2}}>
                <Box sx={{mb: 2}}>
                    <Typography>Text</Typography>
                    <TextField placeholder="Text" value={tmpContent} multiline
                                onChange={(event) => {setTmpContent(event.target.value)}} 
                            
                    />
                    <Button onClick={saveContent} variant="contained" sx={{ml: 2}}>Text speichern</Button>
                </Box>
                <Box>
                    <Typography>Y-Position</Typography>
                    <Slider max={100}
                        value={tmpPos.y} onChange={(event, newValue) => {
                            updatePosition(bubble.position.x, newValue)
                        }} onChangeCommitted={
                            (event, newValue) => {
                            savePosition(bubble.position.x, newValue)
                        }} aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"x: " + tmpPos.y}</Typography>
                <Box>
                    <Typography>X-Position</Typography>
                    <Slider  max={100}
                    value={tmpPos.x} onChange={(event, newValue) => {
                            updatePosition(newValue, yPos)
                        }} onChangeCommitted={
                            (event, newValue) => {
                            savePosition(newValue, yPos)
                        }} aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"y: " + tmpPos.x}</Typography>
                <Box>
                    <Typography>Schriftgröße</Typography>
                    <Slider max={50}
                    value={tmpFontsize} 
                    onChange={(event, newValue) => {updateFontsize(newValue)}} 
                    onChangeCommitted={(event, newValue) => {
                        saveFontsize(newValue)
                    }}
                    aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"fontsize: " + tmpFontsize}</Typography>
                <Box>
                    <Typography>Breite</Typography>
                    <Slider max={100}
                    value={tmpWidth} 
                    onChange={(event, newValue) => {updateWidth(newValue)}} 
                    onChangeCommitted={(event, newValue) => {
                        saveWidth(newValue)
                    }}
                    aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"width: " + tmpWidth}</Typography>
            </Box>
        </Box>
    )
}