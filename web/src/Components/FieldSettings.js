import {  Box, OutlinedInput, FormControl } from "@mui/material";

export default function FieldSettings(props) {

    return (
        <div style={props.style.little}>
            {props.fieldName}
            <Box component="form" noValidate autoComplete="off" sx={{ height: 80 }}>
                <FormControl sx={{ width: '50ch' }}>
                    <OutlinedInput disabled placeholder={props.value} />
                </FormControl>
            </Box>
        </div>
    )
}