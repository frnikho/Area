import { Box, OutlinedInput, FormControl } from "@mui/material";

export default function FieldSettings({ props, style, fieldName, value, active }) {

    const Input = () => {
        if (active)
            return (
                <FormControl sx={{ width: '50ch' }}>
                    <OutlinedInput name={fieldName} placeholder={value} />
                </FormControl>
            )
        else
            return <>
                <FormControl sx={{ width: '50ch' , fontSize: '30px', fontStyle: ''}}>
                    {value}
                </FormControl>
            </>
    }

    return (
        <div style={style.little}>
            {fieldName}
            <Box component="form" onSubmit={(e) => props.handleSubmit(e, fieldName)} noValidate sx={{ mt: 1 }}>
                <Input />
            </Box>
        </div>
    )
}