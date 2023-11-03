import React, { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { uploadBackgroundImage } from "../../fetching/update";
import { useParams } from "react-router-dom";
import { getToken } from "../../utils/getToken";
import { resizeImageBlob } from "../../utils/scaleBlob";

export const ImageUploadAndCrop = (props) => {
  const { frameId } = useParams();

  const { refetch } = props;

  const token = getToken();
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedArea, setCroppedArea] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [open, setOpen] = useState(false);

  const onCropComplete = useCallback(
    (croppedAreaPercentage, croppedAreaPixels) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const onSelectFile = (event) => {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.addEventListener("load", () => {
        setImageSrc(reader.result);
      });
    }
  };

  const handleImageUpload = (croppedImage) => {
    uploadBackgroundImage(token, frameId, croppedImage).then((resp) => {
      refetch();
    });
  };

  const onCrop = async () => {
    try {
      const croppedImageBase64 = await getCroppedImg(imageSrc, croppedArea);    
      const response = await fetch(croppedImageBase64);
      const blob = await response.blob();
      resizeImageBlob(blob, 420, 632).then(
        resizedBlob => {
            handleImageUpload(resizedBlob);
            setOpen(false);
        }
      )
    } catch (e) {
      console.error(e);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setImageSrc(null);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Upload and Crop Image
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Upload and Crop Image</DialogTitle>
        <DialogContent>
          <input
            accept="image/*"
            type="file"
            onChange={onSelectFile}
            style={{ display: "block", marginBottom: "10px" }}
          />
          {imageSrc && (
            <Box
              style={{ position: "relative", height: "400px", width: "100%" }}
            >
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={210 / 316}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={onCrop} color="primary" variant="contained">
            Crop
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

// cropImage.js
async function getCroppedImg(imageSrc, pixelCrop) {
  const image = new Image();
  image.src = imageSrc;
  const canvas = document.createElement("canvas");
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;
  const ctx = canvas.getContext("2d");

  return new Promise((resolve, reject) => {
    image.onload = () => {
      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
      );

      resolve(canvas.toDataURL("image/jpeg"));
    };
    image.onerror = reject;
  });
}
