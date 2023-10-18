import { Check, Edit } from "@mui/icons-material";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { useState } from "react";

export default function GPTSetup(props) {

    const {gptSetup, setGptSetup} = props;

    const workArea = gptSetup.workArea;
    const employer = gptSetup.employer;
    const employerInfo = gptSetup.employerInfo;
    const employee = gptSetup.employee;
    const employeeInfo = gptSetup.employeeInfo;

    const setWorkArea = (newWorkArea) => setGptSetup({...gptSetup, workArea: newWorkArea});
    const setEmployer = (newEmployer) => setGptSetup({...gptSetup, employer: newEmployer});
    const setEmployerInfo = (newEmployerInfo) => setGptSetup({...gptSetup, employerInfo: newEmployerInfo});
    const setEmployee = (newEmployee) => setGptSetup({...gptSetup, employee: newEmployee});
    const setEmployeeInfo = (newEmployeeInfo) => setGptSetup({...gptSetup, employeeInfo: newEmployeeInfo});

    const [editable, setEditable] = useState("");

    const mainElements = [
        {title: "Arbeitsfeld", value: workArea, setValue: setWorkArea},
        {title: "Arbeitgeber*in", value: employer, setValue: setEmployer},
        {title: "Hausangestellte*r", value: employee, setValue: setEmployee},
    ]

    const subElements = [
        {title: "Persönliches AG", value: employerInfo, setValue: setEmployerInfo},
        {title: "Persönliches HA", value: employeeInfo, setValue: setEmployeeInfo},
    ]

    const renderConfigElement = (elem, multiline=false) => {
        if (editable === elem.title) {
            return <FieldComponent key={elem.title} title={elem.title} value={elem.value} unsetEditable={()=> setEditable("")} setValue={elem.setValue}
                multiline={multiline}
            />
        } else {
            return <TextComponent key={elem.title} title={elem.title} value={elem.value} setEditable={() => setEditable(elem.title)}/>
        }
    }

    return(
        <Box sx={{display: "flex", justifyContent: "space-between", mt: 2, mb: 2, p: 2, bgcolor: "secondary.lightest"}}>
            
            <Box sx={{width: "30rem"}}>
            {renderConfigElement(mainElements[0])}

            </Box>
            <Box sx={{width: "30rem"}}>
                {renderConfigElement(mainElements[1])}
                {renderConfigElement(subElements[0], true)}
            </Box>
            <Box sx={{width: "30rem"}}>
                {renderConfigElement(mainElements[2])}
                {renderConfigElement(subElements[1], true)}
            </Box>
        </Box>
    )
}

function TextComponent(props) {

    const {title, value, setEditable} = props;

    return(
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography sx={{mr: 1}} fontWeight={500}>{title}: </Typography><Typography>{value}</Typography><IconButton onClick={setEditable}><Edit color="primary"/></IconButton>
        </Box>
    )
}

function FieldComponent(props) {

    const {title, value, unsetEditable, setValue, multiline} = props;

    const [tmpValue, setTmpValue] = useState(value);

    const handleCheck = () => {
        setValue(tmpValue)
        unsetEditable()
    }

    return(
        <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography sx={{mr: 1}} fontWeight={500}>{title}:</Typography><TextField multiline={multiline} value={tmpValue} onChange={e => setTmpValue(e.target.value)} InputProps={{
                endAdornment: <Check onClick={handleCheck}/>
            }}/>
        </Box>
    )
}