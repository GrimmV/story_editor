import React, { useEffect, useState } from "react";
import { Typography, Slider, TextField, Box, Button } from "@mui/material";
import {
  changePosition,
  saveBubbleContent,
  saveBubbleFontsize,
  saveBubbleWidth,
} from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";
import EasyPopover from "../Utils/EasyPopover";
import uploadClick from "../../../fetching/uploadData";
import { shortenFrameId } from "../../Utility/Helper";

export default function BubbleHandler(props) {
  const token = getToken();

  const { bubble, refetch, frameId } = props;

  const xPos = bubble.position.x;
  const yPos = bubble.position.y;
  const width = bubble.width;
  const fontsize = bubble.fontSize;



  const [tmpContent, setTmpContent] = useState(
    bubble.content ? bubble.content["de"] : ""
  );

  useEffect(() => {
    if(bubble?.content["de"] === null) {
      setTmpContent("")
    } else {
      setTmpContent(bubble.content["de"])
    }
  }, [frameId])

  const [tmpWidth, setTmpWidth] = useState(width);
  const [tmpPos, setTmpPos] = useState(bubble.position);
  const [tmpFontsize, setTmpFontsize] = useState(fontsize);

  const savePosition = (newX, newY) => {
    changePosition(token, "bubble", bubble.id, newX, newY).then(() => {
      refetch();
    });
  };
  const updatePosition = (newX, newY) => {
    setTmpPos({ x: newX, y: newY });
  };

  const saveWidth = (newWidth) => {
    saveBubbleWidth(token, bubble.id, newWidth).then(() => {
      refetch();
    });
  };
  const updateWidth = (newWidth) => {
    setTmpWidth(newWidth);
  };

  const saveFontsize = (newFontsize) => {
    saveBubbleFontsize(token, bubble.id, newFontsize).then(() => {
      refetch();
    });
  };
  const updateFontsize = (newFontsize) => {
    setTmpFontsize(newFontsize);
  };

  const saveContent = () => {
    // setTmpContent("");
    saveBubbleContent(token, bubble.id, tmpContent).then(() => {
      refetch();
      uploadClick("manuell", `eigener Text ${shortenFrameId(frameId)}`)
    });
  };

  if (!props.bubble) return;

  return (
    <Box>
      <Box sx={{ width: "100%" }}>
        <Typography fontWeight={500}>Text:</Typography>
        <Box sx={{display: "flex", flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "100%", mt: 1}}>
        <Box sx={{ mb: 2, flexDirection: "column", display: "flex", alignItems: "center" }}>
          <TextField
            placeholder="Text"
            value={tmpContent}
            multiline
            onChange={(event) => {
              setTmpContent(event.target.value);
            }}
          />
          <Button onClick={saveContent} variant="contained" sx={{width: "100%"}}>
            Text speichern
          </Button>
        </Box>
        <EasyPopover notAbsolute>
          <Box>
            <Box>
              <Typography>Y-Position: {tmpPos.y}</Typography>
              <Slider
                max={100}
                value={tmpPos.y}
                onChange={(event, newValue) => {
                  updatePosition(bubble.position.x, newValue);
                }}
                onChangeCommitted={(event, newValue) => {
                  savePosition(bubble.position.x, newValue);
                }}
                aria-labelledby="continuous-slider"
              />
            </Box>
            <Box>
              <Typography>X-Position: {tmpPos.x}</Typography>
              <Slider
                max={100}
                value={tmpPos.x}
                onChange={(event, newValue) => {
                  updatePosition(newValue, yPos);
                }}
                onChangeCommitted={(event, newValue) => {
                  savePosition(newValue, yPos);
                }}
                aria-labelledby="continuous-slider"
              />
            </Box>
            <Box>
              <Typography>Schriftgröße: {tmpFontsize}</Typography>
              <Slider
                max={50}
                value={tmpFontsize}
                onChange={(event, newValue) => {
                  updateFontsize(newValue);
                }}
                onChangeCommitted={(event, newValue) => {
                  saveFontsize(newValue);
                }}
                aria-labelledby="continuous-slider"
              />
            </Box>
            <Box>
              <Typography>Breite: {tmpWidth}</Typography>
              <Slider
                max={100}
                value={tmpWidth}
                onChange={(event, newValue) => {
                  updateWidth(newValue);
                }}
                onChangeCommitted={(event, newValue) => {
                  saveWidth(newValue);
                }}
                aria-labelledby="continuous-slider"
              />
            </Box>
          </Box>
        </EasyPopover>

        </Box>
      </Box>
    </Box>
  );
}
