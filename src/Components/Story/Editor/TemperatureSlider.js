import { Box, Slider, Typography } from "@mui/material";
import { useState } from "react";
import HelpPopover from "../../Utility/HelpPopover";

export default function TemperatureSlider(props) {
  const defaultTemp = 0.7;
  const localTemp = localStorage.getItem("temperature")

  const [value, setValue] = useState(localTemp ? localTemp : defaultTemp);

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSliderCommit = (event, newValue) => {
    localStorage.setItem("temperature", newValue);
  };

  return (
    <Box sx={{ width: 200 }}>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography sx={{fontWeight: 500}}>ChatGPT Temperatur</Typography>
            <HelpPopover
              info={[
                "Durch die Temperatur lässt sich die 'Kreativität' einstellen. Je höher der Wert, desto 'kreativer' ist ChatGPT",
                "Bei einem niedrigen Wert (bspw. 0), erzeugt ChatGPT immer die statistisch wahrscheinlichsten Texte.",
                "Bei einem hohen Wert (bspw. 1.5), kommt es häufiger vor, dass ChatGPT Worte einbringt, die statistisch weniger wahrscheinlich sind.",
              ]}
              notAbsolute
            />
          </Box>
          <Typography>{value}</Typography>
        </Box>
      </Box>
      <Slider
        min={0}
        max={1.9}
        step={0.1}
        value={value}
        onChange={handleSliderChange}
        onChangeCommitted={handleSliderCommit}
      />
    </Box>
  );
}
