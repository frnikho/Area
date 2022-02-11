import { Box, OutlinedInput, FormControl } from "@mui/material";

export default function FieldSettings({ props, style, fieldName, value, active }) {

    const Input = () => {
        if (active)
            return <OutlinedInput name={fieldName} placeholder={value} />
        else
            return <OutlinedInput disabled placeholder={value} />
    }

    return (
        <div style={style.little}>
            {fieldName}
            <Box component="form" onSubmit={(e) => props.handleSubmit(e, fieldName)} noValidate sx={{ mt: 1 }}>
                <FormControl sx={{ width: '50ch' }}>
                    <Input />
                </FormControl>
            </Box>
        </div>
    )
}