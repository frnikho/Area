import React from "react";
import {FaGithubSquare } from "react-icons/fa";
import { Box } from "@mui/material";

import { makeStyles } from "@material-ui/core/styles"

export default function ServicePage(props) {

    const useStyles = makeStyles({
        rect: {
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
            textAlign: "center",
            borderRadius: "30px",
            width: "500px",
            height: "100px",
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
            <FaGithubSquare size={50} />
            <Box sx={{ padding: 1 }} />
            <div className={classe.description}>
                {props.name}
            </div>
        </div>
    );
}