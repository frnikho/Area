// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import useStyles from "../Components/Styles/styleMenuDashboard"

export default function FieldSettings({ props, classse }) {

    // const buttonMenu = {
    //     fontFamily: 'Dongle', fontSize: '50px', textTransform: "none", color: "black"
    // }

    // const classe = useStyles()

    return (
        <Box component="form" noValidate autoComplete="off" sx={{ height: 80 }}>
            <FormControl sx={{ width: '25ch' }}>
                <OutlinedInput placeholder={props.getUser().firstname} />
            </FormControl>
        </Box>
    )
}