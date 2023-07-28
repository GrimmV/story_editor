import React from "react";
import { Select, MenuItem } from "@mui/material";
import { shortenFrameId } from "../../Utility/Helper";

export default function NextFrameSelector(props) {
  const { handleNextFrameChange, nextFrameId, frameIds } = props;

  const generateNextFrameOptions = () => {
    let options = [];
    for (let id of frameIds) {
      options.push(
        <MenuItem key={id} value={id}>
          {shortenFrameId(id)}
        </MenuItem>
      );
    }
    return options;
  };

  const calculateValue = () => {
    if (!nextFrameId || !(nextFrameId in frameIds)) {
      return "None";
    } else {
      return nextFrameId;
    }
  };

  return (
    <Select
      labelId="demo-simple-select-label"
    //   disabled={props.disabled}
      id="demo-simple-select"
      value={calculateValue()}
      label="Nächster Frame"
      onChange={handleNextFrameChange}
    >
      <MenuItem value="None" selected>
        Keiner
      </MenuItem>
      <MenuItem value="Finished">Abgeschlossen</MenuItem>
      <MenuItem value="Failed">Fehlgeschlagen</MenuItem>
      {generateNextFrameOptions()}
    </Select>
  );
}
