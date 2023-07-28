import React, {useState, useEffect} from 'react';
import { Box, Button} from '@mui/material';
import NextFrameSelector from './NextFrameSelector';
import DeleteModal from '../../Utility/DeleteModal';
import { addBackgroundToFrame, changeBackgroundImageSource, changeNextFrame, deleteFrame, getBackgroundImageCollection, removeFrameBackground } from '../../../fetching/update';
import ImageChooser from '../../Utility/ImageChooser';
import { fetchLoadingHandler } from '../../../utils/fetchLoadingHandler';
import { fetchErrorHandler } from '../../../utils/fetchErrorHandler';
import { getToken } from '../../../utils/getToken';
import { useQuery } from 'react-query';

export default function FrameHandler(props) {

    const {frame, frameIds, refetch} = props;

    const token = getToken()

    const [modalOpen, setModalOpen] = useState(false);

    const {
        data: collection,
        isError,
        isLoading,
    } = useQuery(["backgroundCollection"], getBackgroundImageCollection);

    const loadingResult = fetchLoadingHandler(
        [isLoading],
        ["Bildersammlung"]
    );
    const errorResult = fetchErrorHandler(
        [isError],
        ["Bildersammlung"]
    );
      
    if (loadingResult) return loadingResult;
    if (errorResult) return errorResult;

    const openDeleteModal = () => {
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

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

    const handleNextFrameChange = (event) => {
        changeNextFrame(token, frame.id, event.target.value).then(() => {
            refetch()
        })
    }

    const removeFrame = () => {
        deleteFrame(token, frame.id).then(() => {
            refetch()
        })
    }

    return(
        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <ImageChooser image={frame.backgroundImage} saveImage={setBackground} collection={collection} 
                            deleteImage={removeBackground}
            />
            <NextFrameSelector 
                handleNextFrameChange={handleNextFrameChange} nextFrameId={frame.nextFrameId}
                frameIds={frameIds}
            />
            <Button 
                onClick={openDeleteModal} variant="contained" color="error"
                sx={{mt: 2}}
            >Frame löschen</Button>
            <DeleteModal modalOpen={modalOpen} closeModal={closeModal} 
                        warningText="Möchtest du den Frame wirklich entgültig löschen?" 
                        submitDelete={removeFrame}
                        
            />
        </Box>
    )
}