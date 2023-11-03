import { Box, FormHelperText, TextField } from "@mui/material";

export default function ChoiceAnswerText(props) {
    
    const {isInvalidValue, getErrorMessage, text, handleChange} = props;

    return(
        <Box>
            <TextField textvalue={text} onChange={handleChange} placeholder='Antwortmöglichkeit'/>
            {isInvalidValue() && <FormHelperText error sx={{maxWidth: 250}}>{getErrorMessage()}</FormHelperText>}
        </Box>
    )
}