import React, {useState} from 'react';
import { Box, Button} from '@mui/material';
import DeleteModal from '../../Utility/DeleteModal';
import { changeBackgroundImageSource, deleteFrame, getBackgroundImageCollection, removeFrameBackground } from '../../../fetching/update';
import ImageChooser from '../../Utility/ImageChooser';
import { getToken } from '../../../utils/getToken';
import { useNavigate, useParams } from 'react-router-dom';
import { toStoryEditor } from '../../../routing/routes';

export default function FrameHandler(props) {

    const {frame, refetch} = props;
    const navigate = useNavigate();
    const {storyId} = useParams();

    const token = getToken()

    const [modalOpen, setModalOpen] = useState(false);


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

    const removeFrame = () => {
        deleteFrame(token, frame.id).then(() => {
            navigate(toStoryEditor(storyId))
        })
    }

    return(
        <Box sx={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <ImageChooser image={frame.backgroundImage} saveImage={setBackground}
                            deleteImage={removeBackground} collectionFetcher={getBackgroundImageCollection}
                            collectionIdentifier={"background"}
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
