import { Paper, Box, Pagination } from "@mui/material";
import React, { useState } from "react";
import { ImageUploadAndCrop } from "./ImageUploadAndCrop";
import { useParams } from "react-router-dom";

export default function ImageCollection(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  const { collectionIdentifier, refetch } = props;

  const handleImageClick = (imageSource) => {
    props.closeModal();
    props.updateImage(imageSource);
  };

  function splitIntoSubarrays(arr, n) {
    let result = [];
    for (let i = 0; i < arr.length; i += n) {
      result.push(arr.slice(i, i + n));
    }
    return result;
  }
  const splitImageList = splitIntoSubarrays(props.images, imagesPerPage);

  const renderImages = () => {
    const images = [];

    for (let image of splitImageList[currentPage - 1]) {
      images.push(
        <Paper
          sx={{
            m: 1,
            p: 1,
            key: image,
            "&:hover": {
              cursor: "pointer",
            },
          }}
          onClick={() => handleImageClick(image)}
        >
          <img src={image} alt={image} height="150rem" />
        </Paper>
      );
    }

    return images;
  };

  const handlePageUpdate = (e, page) => {
    setCurrentPage(page);
  };

  return (
    <Box
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap" }}>{renderImages()}</Box>
      {splitImageList.length > 1 && (
        <Pagination
          count={splitImageList.length}
          page={currentPage}
          onChange={handlePageUpdate}
        />
      )}
      {collectionIdentifier === "background" && (
        <ImageUploadAndCrop refetch={refetch} />
      )}
    </Box>
  );
}
