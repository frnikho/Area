import React from "react";
import PropTypes from "prop-types";
import { ButtonBase, Paper, Typography, Box } from "@mui/material";

export default class AppletCard extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ButtonBase sx={{ borderRadius: 6 }} onClick={this.props.onClick}>
                <Paper sx={{ backgroundColor: this.props.color, borderRadius: 6, p: 4, width: 300, height: 215, textAlign: "start" }}>
                    <Typography sx={{ mb: 2 }} fontWeight={"700"} color={"white"} fontSize={26} letterSpacing={0.5} lineHeight={1.2}>{this.props.title}</Typography>
                    <Typography color={"white"}>
                        {this.props.description}
                    </Typography>
                    <Box sx={{ pb: 1, mx: 1 }} />
                    {this.props.icon &&
                        <img src={`https://localhost:8080/static/${this.props.icon}`} width={40} alt="Loarding . . ." />
                    }
                </Paper>
            </ButtonBase>
        );
    }
}

AppletCard.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    icon: PropTypes.string,
    onClick: PropTypes.func,
}
