import React, { useState } from "react";
import { Box, Button, IconButton, Slider, Typography } from "@mui/material";
import ImageChooser from "../../Utility/ImageChooser";
import {
  changeCharacterHeight,
  changeCharacterImgSrc,
  changePosition,
  deleteCharacterImg,
  getCharacterImageCollection,
} from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";
import EasyPopover from "../Utils/EasyPopover";
import { Settings } from "@mui/icons-material";

export default function CharacterHandler(props) {
  const { character, refetch } = props;

  const [height, setHeight] = useState(character.height);
  const [position, setPosition] = useState(character.position);

  const token = getToken();

  const savePosition = (newX, newY) => {
    changePosition(token, "characterframe", character.id, newX, newY).then(
      () => {
        refetch();
      }
    );
  };

  const updatePosition = (newX, newY) => {
    setPosition({ x: newX, y: newY });
  };

  const saveHeight = (newHeight) => {
    changeCharacterHeight(token, character.id, newHeight).then(() => {
      refetch();
    });
  };

  const updateHeight = (newHeight) => {
    setHeight(newHeight);
  };

  const saveCharacterImage = (imageSrc) => {
    changeCharacterImgSrc(token, character.id, imageSrc).then(() => {
      refetch();
    });
  };

  const deleteImage = () => {
    deleteCharacterImg(token, character.id).then(() => {
      refetch();
    });
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography fontWeight={500}>Charakter:</Typography>
          <ImageChooser
            image={character.imageSrc}
            saveImage={saveCharacterImage}
            collectionFetcher={getCharacterImageCollection}
            collectionIdentifier="character"
            deleteImage={deleteImage}
          />
          <EasyPopover notAbsolute>
            <Box>
              <Box>
                <Typography>Y-Position: {position.y}</Typography>
                <Slider
                  max={100}
                  value={position.y}
                  onChange={(event, newValue) => {
                    updatePosition(position.x, newValue);
                  }}
                  onChangeCommitted={(event, newValue) => {
                    savePosition(position.x, newValue);
                  }}
                  aria-labelledby="continuous-slider"
                />
              </Box>
              <Box sx={{ display: "block" }}>
                <Typography>X-Position: {position.x}</Typography>
                <Slider
                  max={100}
                  value={position.x}
                  onChange={(event, newValue) => {
                    updatePosition(newValue, position.y);
                  }}
                  onChangeCommitted={(event, newValue) => {
                    savePosition(newValue, position.y);
                  }}
                  aria-labelledby="continuous-slider"
                />
              </Box>
              <Box sx={{ display: "block" }}>
                <Typography>Größe: {height}</Typography>
                <Slider
                  min={1}
                  max={100}
                  value={height}
                  onChange={(event, newValue) => {
                    updateHeight(newValue);
                  }}
                  aria-labelledby="continuous-slider"
                  onChangeCommitted={(event, newValue) => {
                    saveHeight(newValue);
                  }}
                />
              </Box>
            </Box>
          </EasyPopover>
        </Box>
      </Box>
    </Box>
  );
}
