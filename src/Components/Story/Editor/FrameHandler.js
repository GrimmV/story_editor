import React, {useState} from 'react';
import { Box, Button, Typography} from '@mui/material';
import DeleteModal from '../../Utility/DeleteModal';
import { changeBackgroundImageSource, deleteFrame, getBackgroundImageCollection, removeFrameBackground } from '../../../fetching/update';
import ImageChooser from '../../Utility/ImageChooser';
import { getToken } from '../../../utils/getToken';
import { useNavigate, useParams } from 'react-router-dom';
import { toStoryEditor } from '../../../routing/routes';

export default function FrameHandler(props) {

    const {frame, refetch} = props;

    const token = getToken()

    const setBackground = (imageSource) => {
        changeBackgroundImageSource(token, frame.id, imageSource).then(() => {
            refetch()
        })
    }

    const removeBackground = () => {
        removeFrameBackground(token, frame.id).then(() => {
            refetch()
        })
    }

    return(
        <Box sx={{display: "flex", flexDirection: "row", alignItems: "center"}}>
            <Typography fontWeight={500}>Hintergrund:</Typography>
            <ImageChooser image={frame.backgroundImage} saveImage={setBackground}
                            deleteImage={removeBackground} collectionFetcher={getBackgroundImageCollection}
                            collectionIdentifier={"background"}
            />
        </Box>
    )
}
