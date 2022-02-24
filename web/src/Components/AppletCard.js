import React from "react";
import PropTypes from "prop-types";
import { ButtonBase, Paper, Typography, Box } from "@mui/material";

import Style from "../Resources/Styles/styleAppletCard"

export default class AppletCard extends React.Component {

    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        const imgWidth = 20

        return (
            <ButtonBase sx={{ borderRadius: 6 }} onClick={this.props.onClick}>
                <Paper sx={{ backgroundColor: this.props.color, ...Style.paperContainer }}>
                    <Typography sx={{ mb: 2 }} fontWeight={"700"} color={"white"} fontSize={26} letterSpacing={0.5} lineHeight={1.2}>
                        {this.props.title}
                    </Typography>
                    <Typography color={"white"}>
                        {this.props.description}
                    </Typography>
                    {/* state */}
                    <Box style={Style.authorContainer} >
                        <Typography color={"white"}>
                            {"Status: "}
                        </Typography>
                        <Box sx={{ px: 0.2 }} style={{ with: "1%" }} />
                        <Typography color={this.props.appletStatus ? "#4fe100" : "red"} fontWeight={"800"}>
                            {this.props.appletStatus ? "connedted" : "disconected"}
                        </Typography>
                    </Box>
                    <Box style={Style.authorContainer} >
                        <Typography color={"white"}>
                            {"by "}
                        </Typography>
                        <Box sx={{ px: 0.2 }} style={{ with: "1%" }} />
                        <Typography color={"white"} fontWeight={"800"}>
                            {this.props.author}
                        </Typography>
                    </Box>
                    <Box sx={{ px: 4 }} style={{ height: "5%" }} />
                    <Box sx={{ pb: 1, mx: 1 }} style={Style.imageContainer} >
                        <Box style={Style.image}>
                            {this.props.ifIcon &&
                                <img src={`https://localhost:8080/static/${this.props.ifIcon}`} width={imgWidth} alt="Loarding . . ." />
                            }
                        </Box>
                        <Box sx={{ mt: 0 }} style={{ width: "10px" }} />
                        <Box style={Style.image}>
                            {this.props.thenIcon &&
                                <img src={`https://localhost:8080/static/${this.props.thenIcon}`} width={imgWidth} alt="Loarding . . ." />
                            }
                        </Box>
                    </Box>
                </Paper>
            </ButtonBase>
        );
    }
}

AppletCard.propTypes = {
    title: PropTypes.string,
    color: PropTypes.string,
    description: PropTypes.string,
    ifIcon: PropTypes.string,
    thenIcon: PropTypes.string,
    author: PropTypes.string,
    appletStatus: PropTypes.bool,
    onClick: PropTypes.func,
}
