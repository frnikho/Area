import React from "react";
import {FaDiscord, FaGithubSquare, FaSlack, FaMarker} from "react-icons/fa";
import {Box, Paper, Typography} from "@mui/material";
export default function ServicePage(props) {

    const DEFAULT_ICON_SIZE = 50;

    const showIcon = () => {
        // console.log(props.props.service);
        if (props.props.service.name === 'Github') {
            return <FaGithubSquare size={DEFAULT_ICON_SIZE} color={"white"} />
        } else if (props.props.service.name === 'Slack') {
            return <FaSlack size={DEFAULT_ICON_SIZE}  color={"white"}/>
        } else if (props.props.service.name === 'Intra Epitech') {
            return <FaMarker size={DEFAULT_ICON_SIZE}  color={"white"}/>
        } else if (props.props.service.name === "Discord") {
            return <FaDiscord size={DEFAULT_ICON_SIZE}  color={"white"}/>
        }
    }

    return (
        <Box sx={{mt: 2}}>
            <Paper elevation={0} style={{backgroundColor: '#e74c3c'}}>
                <Box sx={{py: 4}}>
                    {showIcon()}
                    <br/>
                    <Box sx={{mt: 2}}>
                        <Typography component={"h2"} variant={"h5"} color={"white"} fontWeight={"800"}>
                            {props.props.service.name}
                        </Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}
