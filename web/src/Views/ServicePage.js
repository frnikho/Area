import React from "react";
import classNames from 'classnames';
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import { Box } from "@mui/material";

import useStyles from "../Components/Styles/styleService.js"

export default function ServicePage(props) {

    const classe = useStyles()

    return (
        <div className={`${classe.rect} ${classe.orange} ${classe.font}`}>
            <FaGithubSquare size={50} />
            <Box sx={{ padding: 1 }} />
            <div className={classe.description}>
                Applet name
                {props.name}
            </div>
        </div>
    );
}