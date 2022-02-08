import React from "react";
import {
    Box,
    CircularProgress,
    Dialog,
    DialogContent,
    Grid,
    List,
    Typography
} from "@mui/material";
import app from "../../Components/utils/Axios";
import ServiceChildItemCard from "../../Components/ServiceChildItemCard";
import GithubRepositoryDeletedDialog from "./actions/GithubRepositoryDeletedDialog";

export default class ActionDialog extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            services: undefined,
            action: undefined,
            service: undefined,
            dialog: undefined,
        }
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

    onClickAction(action, service) {
        this.setState({
            dialog: action.type.toUpperCase(),
            action: action,
            service: service
        })
    }

    showActions() {
        if (this.state.services === undefined)
            return (<Box m={10} alignContent={"center"} textAlign={"center"}><CircularProgress/></Box>);
        return (
            <List>
                {this.state.services.map((service, indexS) => {
                    return (
                        <Box key={indexS}>
                            <Box textAlign={"start"} sx={{m:4}}>
                                <Typography fontFamily={"Roboto"} fontWeight={"700"} fontSize={46} sx={{display: "flex", alignItems: "center", justifyContent: "start"}}>{service.name}

                                    <img src={`https://localhost:8080/static/${service.icon}`} width={50}/>


                                </Typography>
                            </Box>
                            <div>
                                <Grid container spacing={2} direction="row" justifyContent="center">
                                    {service.actions.map((action, indexA) => {
                                        return (
                                            <Grid item key={indexA}>
                                                <ServiceChildItemCard title={action.name} description={action.description} color={service.color} onClick={() => this.onClickAction(action, service)}/>
                                            </Grid>)
                                    })}
                                </Grid>
                            </div>
                        </Box>
                    );
                })}
            </List>)
    }

    onDialogsClosed(intentional) {
        if (intentional) {
            this.setState({dialog: undefined});
        } else {
            this.setState({dialog: undefined});
            this.props.onClose();
        }
    }

    showDialogs() {
        if (this.state.dialog === undefined)
            return;
        if (this.state.dialog === "GITHUB_REPOSITORY_DELETED") {
            return <GithubRepositoryDeletedDialog onClose={this.onDialogsClosed} action={this.state.action} service={this.state.service}/>
        }
    }

    showMainDialog() {
        if (this.state.dialog !== undefined)
            return;
        return (
            <Dialog
                open={true}
                maxWidth={"xl"}
                fullWidth={true}
                onClose={() => this.props.onClose()}>

                {/* <DialogActions style={{backgroundColor: "black"}}>
                        <IconButton onClick={() => this.props.onClose()}><MdClose color={"white"}/></IconButton>
                    </DialogActions>

                    <img src={`https://localhost:8080/static/applets_banner.png`}/>*/}

                <DialogContent>
                    {this.showActions()}
                </DialogContent>
            </Dialog>
        )
    }

    render() {
        return (
            <div>
                {this.showMainDialog()}
                {this.showDialogs()}
            </div>
        );
    }
}
