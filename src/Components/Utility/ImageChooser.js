import { Modal, Box, Button, Paper } from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageCollection from "./ImageCollection";
import { useQuery } from "react-query";
import { fetchLoadingHandler } from "../../utils/fetchLoadingHandler";
import { fetchErrorHandler } from "../../utils/fetchErrorHandler";
import { Update } from "@mui/icons-material";

export default function ImageChooser(props) {
  const [modalOpen, setModalOpen] = useState(false);

  const { collectionFetcher, collectionIdentifier } = props;

  const {
    data: collection,
    isError,
    isLoading,
    isFetching,
    refetch,
  } = useQuery(["collection" + collectionIdentifier], collectionFetcher);

  const loadingResult = fetchLoadingHandler([isFetching], ["Bildersammlung"]);
  const errorResult = fetchErrorHandler([isError], ["Bildersammlung"]);

  const handleOpen = () => {
    setModalOpen(true);
  };
  const handleClose = () => {
    setModalOpen(false);
  };

  const updateImage = (imageSource) => {
    handleClose();
    props.saveImage(imageSource);
  };

  const deleteImage = () => {
    props.deleteImage();
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", m: 2 }}>
      {props.image ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            width: "100%",
          }}
        >
          <Button onClick={handleOpen}>
            <Update />
            Bild ändern
          </Button>
          <Button onClick={deleteImage} color="error">
            <DeleteIcon />
            Bild löschen
          </Button>
        </Box>
      ) : (
        <Button onClick={handleOpen}>
          <AddIcon />
          Bild hinzufügen
        </Button>
      )}
      <Modal open={modalOpen} onClose={handleClose}>
        <Paper
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            p: 2,
            minWidth: 400,
            minHeight: 400,
            maxHeight: 500,
            overflow: "auto",
          }}
        >
          {!loadingResult && collection && (
            <Box>
              <ImageCollection
                images={collection}
                closeModal={handleClose}
                updateImage={updateImage}
                collectionIdentifier={collectionIdentifier}
                refetch={refetch}
              />
            </Box>
          )}
          {loadingResult}
          {errorResult}
        </Paper>
      </Modal>
    </Box>
  );
}
