import React from "react";
import { Box } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles"

export default function ServicePage(props) {

    const useStyles = makeStyles({
        rect: {
            // alignItems: "center",
            // justifyContent: "center",
            // textAlign: "center",
            display: "flex",
            borderRadius: "30px",
            width: "100%",
            // height: "0%",
        },
        font: {
            fontFamily: "Dongle",
        },
        color: {
            background: props.color,
        },
        description: {
            color: "white",
            fontSize: "50px",
        }
    });

    const classe = useStyles("green")

    return (
        <div className={`${classe.rect} ${classe.color} ${classe.font}`}>
            <Box sx={{ marginTop: 2, marginLeft: 4 }} >
                {props.icon}
            </Box>
            <Box sx={{ padding: 2 }} />
            <div className={classe.description}>
                {props.name}
                <Box sx={{ paddingTop: 0 }} />
                {props.description}
            </div>
        </div>
    );
}