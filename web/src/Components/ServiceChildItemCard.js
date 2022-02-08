import React from "react";
import PropTypes from "prop-types";
import {ButtonBase, Paper, Typography} from "@mui/material";

export default class ServiceChildItemCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ButtonBase sx={{borderRadius: 6}} onClick={this.props.onClick}>
                <Paper sx={{backgroundColor: this.props.color, borderRadius: 6, p: 4, width: 250, height: 150, textAlign: "start"}}>
                    <Typography sx={{mb: 2}} fontWeight={"700"} color={"white"} fontSize={26} letterSpacing={0.5} lineHeight={1.2}>{this.props.title}</Typography>
                    <Typography color={"white"}>
                        {this.props.description}
                    </Typography>
                </Paper>
            </ButtonBase>
        );
    }
}

ServiceChildItemCard.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    onClick: PropTypes.func,
}
