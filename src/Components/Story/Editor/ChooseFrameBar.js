import React from 'react';
import {
    List, ListItem, ListItemText, ListItemIcon, Divider, Box, Typography, ListItemButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StarIcon from '@mui/icons-material/Star';
import ErrorIcon from '@mui/icons-material/Error';
import { shortenFrameId } from '../../Utility/Helper';
import { useNavigate } from 'react-router-dom';
import { toStoryEditorFrame } from '../../../routing/routes';

export default function ChooseFrameBar(props) {

    const {frames, frameId, storyId, addNewFrame} = props;

    const navigate = useNavigate()
  
    const handleListItemClick = (title) => {
        navigate(toStoryEditorFrame(storyId, title))
    };

    const handleAddFrame = (event) => {
        addNewFrame();
    }

    const isSelected = (title) => {
        return title === frameId;
    }


    const renderListItems = () => {
        let listItems = []

        for (let frame of frames) {
            const id = frame.id
            listItems.push(
                    <ListItem
                        disablePadding
                        key={id}
                        onClick={() => handleListItemClick(id)}
                        sx={{display: "flex", justifyContent: "center", bgcolor: "secondary"}}
                    >
                        <ListItemButton selected={isSelected(id)}>
                            <ListItemText primary={shortenFrameId(id)}/>
                        </ListItemButton>
                    </ListItem>
                )
        }
        return listItems;
    }

    return(
    <Box sx={{width: "100%", backgroundColor: "paper", overflow: "auto", maxHeight: "100vh"}}>
        <List aria-label="main mailbox folders">
            {renderListItems()}
        </List>
        <Divider/>
        <List>
            <ListItem
                onClick={(event) => handleAddFrame(event)}
            >
            <ListItemButton>
                <ListItemIcon>
                <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Frame hinzufügen" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    )
}