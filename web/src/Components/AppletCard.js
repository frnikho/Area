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
                    <Box sx={{px: 4}} style={{height: "20%", backgroundColor: "white"}}/>
                    <Box sx={{ pb: 1, mx: 1 }} style={{
                        justifyContent: "right",
                        alignItems: "right",
                        display: "flex",
                        flex: "1",
                        position: "relative",
                        whiteSpace: "nowrap",
                        textAlign: "right",
                    }} >
                        <Box style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                            {this.props.ifIcon &&
                                <img src={`https://localhost:8080/static/${this.props.ifIcon}`} width={20} alt="Loarding . . ." />
                            }
                        </Box>
                        <Box sx={{ mt: 0 }} style={{ width: "10px" }} />
                        <Box style={{ justifyContent: "center", alignItems: "center", display: "flex" }}>
                            {this.props.thenIcon &&
                                <img src={`https://localhost:8080/static/${this.props.thenIcon}`} width={20} alt="Loarding . . ." />
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
    onClick: PropTypes.func,
}
