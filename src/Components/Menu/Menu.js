import { AppBar, Toolbar, Button, Box } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toStoryOverview } from '../../routing/routes';

export default function Menu(props) {

    const navigate = useNavigate()

    const logout = () => {
        props.logout();
    }

    return(
        <AppBar position="static">
            <Toolbar>
                <Box sx={{display: "flex", alignItems: "center", width: "100%"}}>
                    <Button variant="contained" color="secondary"
                            onClick={() => navigate(toStoryOverview)}
                        >Übersicht</Button>
                </Box>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "end", flexShrink: 1}}>
                    <Button variant="contained" color="error"
                            onClick={logout}
                        >Logout</Button>
                </Box>
            </Toolbar>
        </AppBar>
    )
}