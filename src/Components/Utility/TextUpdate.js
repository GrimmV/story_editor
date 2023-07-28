import { IconButton, TextField, Box, Typography } from '@mui/material';
import React, { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';

export default function TextUpdate(props) {

    const [writeMode, setWriteMode] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState(props.text);

    const updateTextFieldValue = (e) => {
        setTextFieldValue(e.target.value);
    }

    const enableWriteMode = () => {
        setWriteMode(true);
    }

    const disableWriteMode = () => {
        setWriteMode(false);
    }

    const submitChange = () => {
        props.submitChange(textFieldValue);
        disableWriteMode();
    }

    const undoChange = () => {
        setTextFieldValue(props.text);
        disableWriteMode();
    }

    if (writeMode) {
        return(
            <Box
                sx={{display: "flex", alignItems:"center", justifyContent: "center"}}
            >
                <TextField value={textFieldValue} onChange={updateTextFieldValue}
                    variant="standard" autoFocus
                />
                <IconButton
                    onClick={submitChange}
                    sx={{ml: 1}}
                ><CheckIcon/></IconButton>                
                <IconButton
                    onClick={undoChange}
                    sx={{ml: 1}}
                ><CancelIcon/></IconButton>
            </Box>
        )
    } else {
        return(
            <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
                <Typography>
                    {props.text}
                </Typography>
                <IconButton
                    onClick={enableWriteMode}
                    sx={{ml: 1}}
                ><EditIcon/></IconButton>
            </Box>
        )
    }
}