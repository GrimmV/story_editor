import React, {useState} from 'react';
import { Typography, Slider, TextField, Box, Button } from '@mui/material';


export default function BubbleHandler(props) {

    const xPos = props.bubble.position.x;
    const yPos = props.bubble.position.y;
    const width = props.bubble.width;
    const fontsize = props.bubble.fontSize;

    const [tmpContent, setTmpContent] = useState(props.bubble.content ? props.bubble.content["de"] : "");

    const savePosition = (newX, newY, commit) => {
        props.changeBubblePosition(newX, newY, commit);
    }

    const saveWidth = (newWidth, commit) => {
        props.changeBubbleWidth(newWidth, commit);
    }

    const saveFontsize = (newFontsize, commit) => {
        props.changeBubbleFontsize(newFontsize, commit);
    }

    const saveContent = () => {
        setTmpContent("");
        props.changeBubbleContent(tmpContent);
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
                        value={yPos} onChange={(event, newValue) => {
                            savePosition(props.bubble.position.x, newValue, false)
                        }} onChangeCommitted={
                            (event, newValue) => {
                            savePosition(props.bubble.position.x, newValue, true)
                            console.log("y: " + newValue);
                        }} aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"x: " + props.bubble.position.x}</Typography>
                <Box>
                    <Typography>X-Position</Typography>
                    <Slider  max={100}
                    value={xPos} onChange={(event, newValue) => {
                            savePosition(newValue, yPos, false)
                        }} onChangeCommitted={
                            (event, newValue) => {
                            savePosition(newValue, yPos, true)
                            console.log("x: " + newValue);
                        }} aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"y: " + props.bubble.position.y}</Typography>
                <Box>
                    <Typography>Schriftgröße</Typography>
                    <Slider max={50}
                    value={fontsize} 
                    onChange={(event, newValue) => {saveFontsize(newValue, false)}} 
                    onChangeCommitted={(event, newValue) => {
                        saveFontsize(newValue, true)
                        console.log("font: " + newValue);
                    }}
                    aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"fontsize: " + fontsize}</Typography>
                <Box>
                    <Typography>Breite</Typography>
                    <Slider max={100}
                    value={width} 
                    onChange={(event, newValue) => {saveWidth(newValue, false)}} 
                    onChangeCommitted={(event, newValue) => {
                        saveWidth(newValue, true)
                        console.log("width: " + newValue);
                    }}
                    aria-labelledby="continuous-slider" />
                </Box>
                <Typography>{"width: " + width}</Typography>
            </Box>
        </Box>
    )
}