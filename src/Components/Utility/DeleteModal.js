import React from 'react';
import { Modal, Box, Button, Paper, Typography } from '@mui/material';

export default function DeleteModal(props) {

    const submitDelete = () => {
        props.submitDelete();
        props.closeModal();
    }

    return (
        <Modal
            open={props.modalOpen}
            onClose={props.closeModal}
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
                    <Typography>{props.warningText}</Typography>
                    <Box
                        sx={{
                            mt: 3
                        }}
                    >
                        <Button sx={{mr: 2}} onClick={props.closeModal}
                            variant="contained" color="primary"
                        >Zurück</Button>
                        <Button onClick={submitDelete}
                            variant="contained" color="error"
                        >Entgültig Löschen</Button>
                    </Box>
                </Paper>
        </Modal>
    )
}