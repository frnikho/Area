import style from "../Resources/CSS/Service.css";
import React from "react";
import classNames from 'classnames';
import { FaGoogle, FaGithubSquare } from "react-icons/fa";
import { Box } from "@mui/material";

export default class ServiceView extends React.Component {

    constructor(props) {
        super(props);
        this.name = props.name
    }


    render() {
        return (
            <div className={"rect" + " " + "orange" + " font"}>
                <FaGithubSquare size={50} />
                <Box sx={{ padding: 1 }} />
                <div className="description">
                    Applet name
                    {this.name}
                </div>
            </div>
        );
    }
}