import { Paper, Box } from '@mui/material';
import React from 'react';

export default function ImageCollection(props) {

    const handleImageClick = (imageSource) => {
        props.closeModal();
        props.updateImage(imageSource);
    }

    const renderImages = () => {

        const images = [];

        for (let image of props.images) {
            images.push(
                <Paper sx={{
                    m: 1, p: 1,
                    key: image,
                    "&:hover": {
                        cursor: "pointer"
                    },
                }}
                    onClick={() => handleImageClick(image)}
                >
                    <img src={image} alt={image} height="200rem"/>
                </Paper>
            )
        }

        return images;
    }

    return(
        <Box sx={{display: "flex", flexWrap: "wrap"}}>
            {renderImages()}
        </Box>
    )
}