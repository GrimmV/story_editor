import { Input, Modal, Box, Button, Paper, IconButton } from '@mui/material';
import React, {useState} from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ImageUpload(props) {

    const defaultImageState = {
        file: null,
        path: props.image
    }

    const [modalOpen, setModalOpen] = useState(false);
    const [tmpImage, setTmpImage] = useState(defaultImageState);
    
    const handleOpen = () => {
        setModalOpen(true)
        setTmpImage(defaultImageState);
    };
    const handleClose = () => {
        setModalOpen(false);
    };

    const closeAndSaveTmpImage = () => {
        handleClose();
    }

    const onInputChange = (event) => {
        setTmpImage(
            {
                file: event.target.files[0],
                path: URL.createObjectURL(event.target.files[0])
            }
        );
    }

    const uploadImage = () => {
        handleClose();
        props.uploadImage(tmpImage.file)
    }

    const deleteImage = () => {
        props.deleteImage();
    }

    return(
        <Box
            sx={{ display: "flex", justifyContent: "center", m: 2 }}
        >
            {
                props.image
                ?
                <Box
                    sx={{display: "flex", flexDirection: "row-reverse"}}
                >
                    <IconButton onClick={deleteImage} sx={{alignSelf: "start"}}><DeleteIcon/></IconButton>
                    <Box onClick={handleOpen} 
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            padding: 4,
                            '&:hover': {
                                opacity: 0.7,
                                cursor: "pointer",
                            }
                        }}
                    >
                        <img
                        style={{
                            width: "10rem", height: "auto",
                        }} src={props.image} alt=""/>
                    </Box>
                </Box>
                :<Button onClick={handleOpen}><AddIcon/>Bild hinzufügen</Button>
            }
            <Modal
                open={modalOpen}
                onClose={closeAndSaveTmpImage}
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
                        tmpImage
                        ?
                        <Box>
                            <img style={{
                            width: "10rem", height: "auto", 
                            maxHeight: "20rem", padding: "1rem"
                            }} src={tmpImage.path} alt=""/>
                        </Box>
                        :
                        <Box sx={{width: "20rem", height: "20rem"}}/>
                    }
                    <Input type="file" InputProps={{accept: ".png"}} onChange={onInputChange}
                        sx={{mb: 2}}
                    />
                    <Box sx={{display: "flex"}}>
                        <Button onClick={handleClose} color="error" variant="contained"
                            sx={{mr: 3}}
                        >Zurück</Button>
                        <Button onClick={uploadImage} variant="contained">Speichern</Button>
                    </Box>
                </Paper>
            </Modal>
        </Box>
        
    )
}