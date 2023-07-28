import React, {useState} from 'react';
import {Card, CardContent, TextField, Button} from '@mui/material';

export default function StoryCreation(props) {

    const {createStory} = props;

    const [title, setTitle] = useState("");

    const changeTitle = (e) => {
        setTitle(e.target.value);
    }

    const resetTitle = () => {
        setTitle("");
    }

    const submitStoryCreation = () => {
        createStory(title);
        resetTitle()
    }

    return(
        <Card
            sx={{
                display: "flex",
                justifyContent: "center",
                m: 2
            }}
        >
            <CardContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center"
                }}
            >
                <TextField value={title} onChange={changeTitle}/>
                <Button onClick={submitStoryCreation}
                    sx={{mt: 2}}
                >
                    Story hinzufügen
                </Button>
            </CardContent>
        </Card>
    )
}