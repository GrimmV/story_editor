import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Tooltip,
  Typography,
} from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { shortenFrameId } from "../../Utility/Helper";
import { useNavigate, useParams } from "react-router-dom";
import { toStoryEditorFrame } from "../../../routing/routes";
import { Delete, LibraryAdd } from "@mui/icons-material";
import { useState } from "react";
import DeleteModal from "../../Utility/DeleteModal";

export default function DnDList(props) {
  const { items, moveFrame, addFrame, removeFrame } = props;

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

  // Function to update list on drop
  const handleDrop = (droppedItem) => {
    if (droppedItem.destination) {
      const dest = droppedItem.destination.index;
      const source = droppedItem.source.index;

      if (dest === source) return;

      const sourceFrameId = items[source].frame.id;
      const itemsWithoutSource = items.filter((v, i) => {
        return i !== source
      });
      console.log(items, itemsWithoutSource);
      let newPrevFrameId = dest > 0 ? itemsWithoutSource[dest - 1].frame.id : null;

      moveFrame(sourceFrameId, newPrevFrameId);
    }
  };

  return (
    <Box>
      <DragDropContext onDragEnd={handleDrop}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <List
              {...provided.droppableProps}
              ref={provided.innerRef}
              sx={{
                userSelect: "none",
                p: 1,
                m: 1,

                //   // change background colour if dragging
                //   background: snapshot.isDraggingOver ? "lightgreen" : "white",
              }}
            >
              {items.map((item, index) => (
                <Draggable
                  key={item.frame.id}
                  draggableId={item.frame.id}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <ListItem
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Tooltip title={item.text}>
                        <ListItemButton
                          selected={isSelected(item.frame.id)}
                          variant
                          sx={{
                            bgcolor: snapshot.draggingOver
                              ? "primary.lightest"
                              : "white",
                            width: "100%",
                            display: "flex",
                          }}
                          onClick={() => handleListItemClick(item.frame.id)}
                        >
                          <ListItemText>
                            <Typography>
                              {shortenFrameId(item.frame.id)}
                            </Typography>
                            <Typography noWrap>{item.text}</Typography>
                          </ListItemText>
                          <IconButton
                            color="primary"
                            onClick={() => addFrame(item.frame.id)}
                          >
                            <LibraryAdd />
                          </IconButton>
                          <IconButton
                            onClick={() => openDeleteModal(item.frame.id)}
                            color="error"
                          >
                            <Delete />
                          </IconButton>
                        </ListItemButton>
                      </Tooltip>
                      <DeleteModal
                        modalOpen={modalItemId === item.frame.id}
                        closeModal={closeModal}
                        warningText="Möchtest du den Frame wirklich entgültig löschen?"
                        submitDelete={() => removeFrame(item.frame.id)}
                      />
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
}
