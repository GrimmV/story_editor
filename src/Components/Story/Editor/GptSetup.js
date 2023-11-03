import { ArrowBack, Check, Edit, Send, Upgrade } from "@mui/icons-material";
import {
  Box,
  Button,
  CircularProgress,
  IconButton,
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
  updateWorkarea,
} from "../../../fetching/update";
import { getToken } from "../../../utils/getToken";
import GptSetupOutline from "./GptSetupOutline";
import TemperatureSlider from "./TemperatureSlider";

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
  const [editable, setEditable] = useState("");

  useEffect(() => {
    if (!tempActive) {
      localStorage.removeItem("temperature");
    }
  }, [tempActive])

  let workArea;
  let employer;
  let employerInfo;
  let employee;
  let employeeInfo;

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
  } else {
    workArea = gptSetup.workArea;
    employer = gptSetup.employer;
    employerInfo = gptSetup.employerInfo;
    employee = gptSetup.employee;
    employeeInfo = gptSetup.employeeInfo;
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

  const mainElements = [
    { title: "Arbeitsfeld", value: workArea, setValue: setWorkArea },
    { title: "Arbeitgeber*in", value: employer, setValue: setEmployer },
    { title: "Hausangestellte*r", value: employee, setValue: setEmployee },
  ];

  const subElements = [
    {
      title: "Persönliches AG",
      value: employerInfo,
      setValue: setEmployerInfo,
    },
    {
      title: "Persönliches HA",
      value: employeeInfo,
      setValue: setEmployeeInfo,
    },
  ];

  const renderConfigElement = (elem, multiline = false) => {
    if (editable === elem.title) {
      return (
        <FieldComponent
          key={elem.title}
          title={elem.title}
          value={elem.value}
          unsetEditable={() => setEditable("")}
          setValue={elem.setValue}
          multiline={multiline}
        />
      );
    } else {
      return (
        <TextComponent
          key={elem.title}
          title={elem.title}
          value={elem.value}
          setEditable={() => setEditable(elem.title)}
        />
      );
    }
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
        refetch={refetch}
        storyId={storyId}
        isFetching={isFetching}
        gptActive={gptActive}
      />
    </Box>
  );
}

function TextComponent(props) {
  const { title, value, setEditable } = props;

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ mr: 1 }} fontWeight={500}>
        {title}:{" "}
      </Typography>
      <Typography>{value}</Typography>
      <IconButton onClick={setEditable}>
        <Edit color="primary" />
      </IconButton>
    </Box>
  );
}

function FieldComponent(props) {
  const { title, value, unsetEditable, setValue, multiline } = props;

  const [tmpValue, setTmpValue] = useState(value);

  const handleCheck = () => {
    if (value !== tmpValue) {
      setValue(tmpValue);
    }
    unsetEditable();
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Typography sx={{ mr: 1 }} fontWeight={500}>
        {title}:
      </Typography>
      <TextField
        multiline={multiline}
        value={tmpValue}
        onChange={(e) => setTmpValue(e.target.value)}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={handleCheck}
              sx={{ color: "primary.main", "&:hover": { cursor: "pointer" } }}
            >
              <Check />
            </IconButton>
          ),
        }}
      />
    </Box>
  );
}
