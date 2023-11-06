import {
  ChangeCircleOutlined,
  CloudDone,
} from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  updateEmployee,
  updateEmployeeInfo,
  updateEmployer,
  updateEmployerInfo,
  updateOutline,
  updateWorkarea,
} from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";
import GptSetupOutline from "./GptSetupOutline";
import TemperatureSlider from "./TemperatureSlider";
import HelpPopover from "../../Utility/HelpPopover";

export default function GPTSetup(props) {
  const {
    gptSetup,
    storyId,
    isFetching,
    isError,
    refetch,
    gptActive,
    tempActive,
  } = props;

  const token = getToken();

  useEffect(() => {
    if (!tempActive) {
      localStorage.removeItem("temperature");
    }
  }, [tempActive]);

  let workArea;
  let employer;
  let employerInfo;
  let employee;
  let employeeInfo;
  let outline;

  if (isFetching)
    return (
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography>Einstellungen werden geladen</Typography>
        <CircularProgress />
      </Box>
    );
  if (isError || !gptSetup) {
    workArea = "";
    employer = "";
    employerInfo = "";
    employee = "";
    employeeInfo = "";
    outline = "";
  } else {
    workArea = gptSetup.workArea;
    employer = gptSetup.employer;
    employerInfo = gptSetup.employerInfo;
    employee = gptSetup.employee;
    employeeInfo = gptSetup.employeeInfo;
    outline = gptSetup.outline;
  }

  const setWorkArea = (newWorkArea) =>
    updateWorkarea(token, storyId, newWorkArea).then((resp) => refetch());
  const setEmployer = (newEmployer) =>
    updateEmployer(token, storyId, newEmployer).then((resp) => refetch());
  const setEmployerInfo = (newEmployerInfo) =>
    updateEmployerInfo(token, storyId, newEmployerInfo).then((resp) =>
      refetch()
    );
  const setEmployee = (newEmployee) =>
    updateEmployee(token, storyId, newEmployee).then((resp) => refetch());
  const setEmployeeInfo = (newEmployeeInfo) =>
    updateEmployeeInfo(token, storyId, newEmployeeInfo).then((resp) =>
      refetch()
    );
  const setOutline = (newOutline) => {
    updateOutline(token, storyId, newOutline).then((resp) => refetch());
  };

  const mainElements = [
    { title: "Arbeitsfeld", info: "Titel des Arbeitsfelds, bspw: Reinigungsarbeit, Pflege, Gartenarbeit, Kinderbetreuung, ...", value: workArea, setValue: setWorkArea },
    { title: "Arbeitgeber*in", info: "Name der Arbeitgeber*in", value: employer, setValue: setEmployer },
    { title: "Hausangestellte*r", info: "Name der/des Haushaltsangestelten", value: employee, setValue: setEmployee },
  ];

  const subElements = [
    {
      title: "Persönliches AG",
      info: "Persönliche Informationen über den/die Arbeitgeber*in. Beispielsweise Persönlichkeitsmerkmale, äußere Merkmale, Beruf, Hobbies, aktuelle Stimmung, ...",
      value: employerInfo,
      setValue: setEmployerInfo,
    },
    {
      title: "Persönliches HA",
      info: "Persönliche Informationen über den/die Haushaltsangestellte/n. Beispielsweise Persönlichkeitsmerkmale, äußere Merkmale, weitere Beruf, Hobbies, aktuelle Stimmung, ...",
      value: employeeInfo,
      setValue: setEmployeeInfo,
    },
  ];

  const renderConfigElement = (elem, multiline = false) => {
    return (
      <FieldComponent
        key={elem.title}
        title={elem.title}
        info={elem.info}
        value={elem.value}
        setValue={elem.setValue}
        multiline={multiline}
      />
    );
  };

  return (
    <Box sx={{ width: "100%" }}>
      {tempActive && (
        <Paper
          sx={{
            bgcolor: "secondary.lightest",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
            mb: 2,
          }}
        >
          <TemperatureSlider />
        </Paper>
      )}
      <Paper
        sx={{
          bgcolor: "secondary.lightest",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 2,
          mb: 2,
        }}
      >
        <Typography sx={{ fontWeight: 500 }}>
          Lege Grundlegende Informationen der Charaktere fest.
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            p: 2,
            width: "100%",
          }}
        >
          <Box sx={{ width: "20rem" }}>
            {renderConfigElement(mainElements[0])}
          </Box>
          <Box sx={{ width: "20rem" }}>
            {renderConfigElement(mainElements[1])}
            {renderConfigElement(subElements[0], true)}
          </Box>
          <Box sx={{ width: "20rem" }}>
            {renderConfigElement(mainElements[2])}
            {renderConfigElement(subElements[1], true)}
          </Box>
        </Box>
      </Paper>
      <GptSetupOutline
        gptSetup={gptSetup}
        outline={outline}
        setOutline={setOutline}
        isFetching={isFetching}
        gptActive={gptActive}
      />
    </Box>
  );
}

function FieldComponent(props) {
  const { title, info, value, setValue, multiline } = props;

  const [tmpValue, setTmpValue] = useState(value);

  const handleSave = () => {
    if (value !== tmpValue) {
      setValue(tmpValue);
    }
  };

  const computeStatusIcon = () => {
    if (tmpValue === value) return <CloudDone color="success" />;
    else return <ChangeCircleOutlined color="error" />;
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 200, mb: 2
      }}
    >
      <Box sx={{display: "flex", alignItems: "center"}}>
        <Typography sx={{fontWeight: 500}}>{title}</Typography>
        <HelpPopover info={[info]} notAbsolute/>
      </Box>
      <Paper>
        <TextField
          multiline={multiline}
          minRows={2}
          sx={{ width: "100%" }}
          value={tmpValue}
          onChange={(e) => setTmpValue(e.target.value)}
          InputProps={{
            endAdornment: computeStatusIcon(),
          }}
        />
      </Paper>
      <Button
        sx={{ width: "100%" }}
        variant="contained"
        onClick={handleSave}
        disabled={tmpValue === value}
      >
        Aktualisieren
      </Button>
    </Box>
  );
}
