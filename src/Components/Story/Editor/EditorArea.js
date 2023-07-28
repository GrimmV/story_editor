import { Box, Paper, Button } from '@mui/material';
import React from 'react';

export default function EditorArea(props) {

    const {choices, character, bubble, frame} = props;

    const renderChoices = () => {
        let choicesJS = [];

        if (choices["answers"]) {
            Object.entries(choices["answers"]).forEach(([k,v]) => {
                choicesJS.push(
                    <Box key={k}>
                        <Button color={v.correct ? "success" : "error"}
                            sx={{mb: 1, display: "block"}} variant="contained"
                        >{v["answer"]["de"]}</Button>
                    </Box>
                )
            })
        }
        return choicesJS;
    }

    return(
        <Box sx={{
            display: "flex", p: 2, justifyContent: "center"
        }}>
            <Paper sx={{p: 2, maxWidth: "350px", position: "relative"}}>
                {
                    frame.backgroundImage
                    ?
                    <img style={{width: "16rem", height: "26rem"}} src={frame.backgroundImage} alt="background"/>
                    :<Box sx={{backgroundColor: "#000", width: "16rem", height: "26rem"}}></Box>
                }
                {
                    character && character.imageSrc &&
                    <img style={{
                        position: "absolute", bottom: character.position.y + "%",
                        left: character.position.x + "%", 
                        height: character.height + "%"
                    }} src={character.imageSrc} alt="character"/>
                }
                {
                    bubble && bubble.content &&
                    <Box sx={{
                        position: "absolute", bottom: bubble.position.y + "%",
                        left: bubble.position.x + "%",
                        fontSize: bubble.fontSize + "px",
                        lineHeight: "24px",
                        width: bubble.width + "%",
                        background: "#fff",
                        borderRadius: "40px",
                        padding: "24px",
                        textAlign: "center",
                        color: "#000"
                    }}>
                        {bubble.content["de"]}
                    </Box>
                }
                {
                    choices &&
                    <Box sx={{
                        position: "absolute",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        bottom: choices.position.y + "%",
                        left: choices.position.x + "%",
                    }}>
                        {renderChoices(choices)}
                    </Box>
                }
            </Paper>
        </Box>

    )
}