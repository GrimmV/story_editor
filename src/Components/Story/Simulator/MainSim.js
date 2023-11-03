import { Modal, Box, Button, Paper } from '@mui/material';
import React, {useEffect, useState} from 'react';

export default function MainSim(props) {

    const {modalOpen, closeModal, frames, choices, bubbles, characters} = props;

    const [activeFrameId, setActiveFrameId] = useState(frames.find(frame => frame.first).id);
    const [endScreen, setEndScreen] = useState(false);

    const activeFrame = frames.find(frame => frame.id === activeFrameId);
    const character = characters.find(char => char.frameId === activeFrameId);
    const bubble = bubbles.find(bubble => bubble.frameId === activeFrameId);
    const choice = choices.find(choice => choice.frameId === activeFrameId);

    useEffect(() => {
        if (!activeFrame.nextFrameId && !choice) {
            setEndScreen(true);
        }
    }, [activeFrameId, choice, modalOpen])

    const resetActiveFrameId = () => {
        if (!(activeFrame.first && !activeFrame.nextFrameId)) {
            setEndScreen(false);
            setActiveFrameId(frames.find(frame => frame.first).id)
        }
    }

    const handleModalClose = () => {
        resetActiveFrameId()
        closeModal()
    }
    
    const moveToFrame = (frameId) => {
        setActiveFrameId(frameId);
    }

    const renderChoices = () => {
        let choicesJS = [];

        if (choice["answers"]) {
            for (let answer of choice["answers"]) {
                choicesJS.push(
                    <Box key={answer.answer.de}>
                        <Button onClick={() => moveToFrame(answer.nextFrame)}
                            sx={{mb: 1, display: "block"}} variant="contained" color="secondary"
                        >{answer.answer.de}</Button>
                    </Box>
                )
            }
        }
        return choicesJS;
    }

    if (activeFrame) {
        return(
            <Modal
                open={modalOpen}
                onClose={handleModalClose}
            >
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        p: 4,
                    }}>
                    <Paper sx={{p: 2, maxWidth: "350px", position: "relative"}}>
                        {
                            activeFrame.backgroundImage
                            ?
                            <img style={{width: "16rem", height: "26rem"}} src={activeFrame.backgroundImage} alt="background"/>
                            :<Box sx={{backgroundColor: "#000", width: "16rem", height: "26rem"}}></Box>
                        }
                        {
                            character?.imageSrc &&
                            <img style={{
                                position: "absolute", bottom: character.position.y + "%",
                                left: character.position.x + "%", 
                                height: character.height + "%"
                            }} src={character.imageSrc} alt="character"/>
                        }
                        {
                            bubble?.content &&
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
                            choice &&
                            <Box sx={{
                                position: "absolute",
                                bottom: choice.position.y + "%",
                                left: choice.position.x + "%",
                            }}>
                                {renderChoices()}
                            </Box>
                        }
                    </Paper>
                    {
                        (!choice?.answers || choice.answers.length === 0) && !endScreen &&
                        <Button variant="contained" onClick={() => moveToFrame(activeFrame.nextFrameId)}>Weiter</Button>
                    }
                    {
                        endScreen &&
                        <Box>
                            {
                                !(activeFrame.first && !activeFrame.nextFrameId) &&
                                <Button onClick={resetActiveFrameId}>Neu starten</Button>
                            }
                            <Button onClick={handleModalClose}>Beenden</Button>
                        </Box>
                    }
                </Paper>
            </Modal>
        )} else {
        return null;
    }
}
