import { Modal, Box, Button, Paper, Typography } from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ImageCollection from './ImageCollection';

export default function ImageChooser(props) {

    const [modalOpen, setModalOpen] = useState(false);
    
    const handleOpen = () => {
        setModalOpen(true)
    };
    const handleClose = () => {
        setModalOpen(false);
    };

    const updateImage = (imageSource) => {
        handleClose();
        props.saveImage(imageSource)
    }

    const deleteImage = () => {
        // props.deleteImage();
    }

    return(
        <Box
            sx={{ display: "flex", justifyContent: "center", m: 2 }}
        >
            {
                props.image
                ?
                <Box>
                    <Typography sx={{mb: 1}}>{props.image}</Typography>
                    <Button onClick={handleOpen}><AddIcon/>Bild ändern</Button>
                    <Button onClick={deleteImage} color="error"><DeleteIcon/>Bild löschen</Button>
                </Box>
                :<Button onClick={handleOpen}><AddIcon/>Bild hinzufügen</Button>
            }
            <Modal
                open={modalOpen}
                onClose={handleClose}
            >
                <Paper
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        p: 4,
                    }}
                >
                {
                    props.collection &&
                    <ImageCollection images={props.collection}
                        closeModal={handleClose} updateImage={updateImage}
                    />
                }
                </Paper>
            </Modal>
        </Box>
        
    )
}