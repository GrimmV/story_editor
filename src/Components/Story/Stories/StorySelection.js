import React, { useState } from "react";
import ImageUpload from '../../Utility/ImageUpload'
import DeleteModal from "../../Utility/DeleteModal";
import { Box, Card, CardContent, CardHeader, IconButton } from "@mui/material";
import TextUpdate from "../../Utility/TextUpdate";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function StorySelection(props) {
  const {
    removeStory,
    changeTitle,
    id,
    title,
    moveToStory,
    image
  } = props;

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setDeleteModalOpen(true);
  };

  const deleteStory = () => {
    removeStory(id);
  };

  const updateTitle = (newName) => {
    changeTitle(id, newName);
  };

  return (
    <Card
      sx={{
        p: 2,
        m: 2,
      }}
    >
      <CardHeader
        action={
          <Box>
            <IconButton
              color="error"
              onClick={openDeleteModal}
              aria-label="open delete modal"
            >
              <DeleteIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => moveToStory(id)}>
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        }
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <CardContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <TextUpdate text={title} submitChange={updateTitle} />
          </Box>
        </CardContent>
        <DeleteModal
          modalOpen={deleteModalOpen}
          closeModal={() => setDeleteModalOpen(false)}
          warningText={
            "Möchtest du Das Thema '" +
            title +
            "' und alle damit verknüpften Unter-Themen und Fragen entgültig löschen?"
          }
          submitDelete={deleteStory}
        />
      </Box>
    </Card>
  );
}
