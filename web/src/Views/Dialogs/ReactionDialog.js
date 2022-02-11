import React from "react";
import {
    Box,
    CircularProgress,
    Dialog, DialogContent,
    Grid,
    List,
    Typography
} from "@mui/material";
import ServiceChildItemCard from "../../Components/ServiceChildItemCard";
import PropTypes from "prop-types";
import {CircularProgress, Dialog, List, Typography} from "@mui/material";
import app from "../../Utils/Axios";

export default class ReactionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: undefined,
        }
    }

    componentDidMount() {
        app.get('/about.json').then((response) => {
            this.setState({
                services: response.data.server.services
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    onClickReaction(data, service) {
        console.log(this.props.currentAction);
        console.log(data, service);
    }

    showReactions() {
        if (this.state.services === undefined)
            return (<CircularProgress/>);
        return (
            <List>
                {this.state.services.map((service, indexS) => {
                    return (
                        <Box key={indexS}>
                            <Box textAlign={"start"} sx={{my: 2, display: "flex", alignItems: "center", justifyContent: "start"}}>
                                <Typography fontFamily={"Roboto"} fontWeight={"700"} fontSize={46} sx={{mx: 2}}>
                                    {service.name}
                                </Typography>
                                <img src={`https://localhost:8080/static/${service.icon}`} width={58}/>
                            </Box>
                            <div>
                                <Grid container spacing={2} direction="row" justifyContent="center">
                                    {service.reactions.map((reaction, indexA) => {
                                        return (
                                            <Grid item key={indexA}>
                                                <ServiceChildItemCard title={reaction.name} description={reaction.description} color={service.color} onClick={() => this.onClickReaction(reaction, service)}/>
                                            </Grid>)
                                    })}
                                </Grid>
                            </div>
                        </Box>
                    );
                })}
            </List>)


    }

    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    maxWidth={"lg"}
                    fullWidth={true}
                    onClose={() => this.props.onClose()}>
                    <DialogContent>
                        {this.showReactions()}
                    </DialogContent>
                </Dialog>
            </div>
        );
    }
}

ReactionDialog.propTypes = {
    currentAction: PropTypes.object.isRequired
}
