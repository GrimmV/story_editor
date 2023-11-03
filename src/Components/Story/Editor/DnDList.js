import {
  Box,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { shortenFrameId } from "../../Utility/Helper";
import { useNavigate, useParams } from "react-router-dom";
import { toStoryEditorFrame } from "../../../routing/routes";
import { Delete, LibraryAdd } from "@mui/icons-material";
import { useState } from "react";
import DeleteModal from "../../Utility/DeleteModal";

export default function DnDList(props) {
  const { items, hasChoices, addFrame, removeFrame } = props;

  const navigate = useNavigate();
  const { storyId, frameId } = useParams();
  const [modalItemId, setModalItemId] = useState(null);

  const openDeleteModal = (id) => {
    setModalItemId(id);
  };

  const closeModal = () => {
    setModalItemId(null);
  };

  const handleListItemClick = (title) => {
    navigate(toStoryEditorFrame(storyId, title));
  };
  const isSelected = (title) => {
    return title === frameId;
  };

  return (
    <Box>
      <List
        sx={{
          userSelect: "none",
          p: 1,
          m: 1,
        }}
      >
        {items.map((item, index) => (
          <ListItem key={item.frame.id}>
            <Tooltip title={item.text}>
              <ListItemButton
                selected={isSelected(item.frame.id)}
                sx={{
                  width: "100%",
                  display: "flex",
                }}
                onClick={() => handleListItemClick(item.frame.id)}
              >
                <ListItemText>
                  <Typography>{shortenFrameId(item.frame.id)}</Typography>
                  <Typography noWrap sx={{fontWeight: 500}}>{item.text}</Typography>
                </ListItemText>
              </ListItemButton>
            </Tooltip>
            {(index !== items.length - 1 || !hasChoices) && (
              <IconButton
                color="primary"
                onClick={() => addFrame(item.frame.id)}
              >
                <LibraryAdd />
              </IconButton>
            )}
            {
              index !== 0 &&
              <IconButton
                onClick={() => openDeleteModal(item.frame.id)}
                color="error"
              >
                <Delete />
              </IconButton>
            }
            <DeleteModal
              modalOpen={modalItemId === item.frame.id}
              closeModal={closeModal}
              warningText="Möchtest du den Frame wirklich entgültig löschen?"
              submitDelete={() => removeFrame(item.frame.id)}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
