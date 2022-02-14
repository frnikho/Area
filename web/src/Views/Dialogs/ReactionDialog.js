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
import app from "../../Utils/Axios";
import DiscordSendMessageDialog from "./discord/reactions/DiscordSendMessageDialog";

export default class ReactionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: undefined,
            dialog: undefined,
            reaction: undefined,
            service: undefined
        }
        this.onClickReaction = this.onClickReaction.bind(this);
        this.onDialogsClosed = this.onDialogsClosed.bind(this);
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
        this.setState({
            dialog: data.type,
            reaction: data,
            service,
        })
    }

    onDialogsClosed(onlyDialog) {
        if (onlyDialog) {
            this.setState({dialog: undefined});
        } else {
            this.setState({dialog: undefined});
            this.props.onClose();
        }
    }

    onReactionCreated(data) {
        this.onDialogsClosed(false);
        this.props.onSelected(data, this.state.reaction, this.state.service);
    }

    showDialogs() {
        if (this.state.dialog === undefined)
            return;
        const hooks = {
            discord_send_chanel_message: <DiscordSendMessageDialog onClose={this.onDialogsClosed} onReactionCreated={this.onReactionCreated} reaction={this.state.reaction} service={this.state.service}/>,
        }
        return hooks[this.state.dialog];
    }

    showReactions() {
        if (this.state.services === undefined)
            return (<CircularProgress/>);
        return (
            <List>
                {this.state.services.map((service, indexS) => {
                    if (service.reactions.length === 0)
                        return;
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

    showMainDialog() {
        if (this.state.dialog !== undefined)
            return;
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
        )
    }

    render() {
        return (
            <>
                {this.showMainDialog()}
                {this.showDialogs()}
            </>

        );
    }
}
