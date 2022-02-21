import React from "react";
import {
    ThemeProvider,
    Box,
    CssBaseline,
    Grid,
    IconButton,
    Paper,
    Button,
    Typography,
    ButtonBase,
    Card, CardHeader, CardContent, CardActions
} from "@mui/material";

import { AuthContext } from "../../Contexts/AuthContext";
import app, { config } from "../../Utils/Axios";

import Page from "../Page"
import Header from "../../Components/Header"
import Style from "../../Resources/Styles/styleContext"
import { theme } from "../../Resources/Styles/AppTheme";
import {FaNewspaper, FaPlus, FaPlusCircle, FaTrash} from "react-icons/fa";
import GithubNewContextDialog from "../Dialogs/context/GithubNewContextDialog";
import DiscordNewContextDialog from "../Dialogs/context/DiscordNewContextDialog";

export default class ContextPage extends Page {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            services: undefined,
            selectedService: undefined,
            contexts: undefined,
            dialog: undefined,
        }
        this.onClickSelectServiceIcon = this.onClickSelectServiceIcon.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.refresh = this.refresh.bind(this);
        this.onCreateContext = this.onCreateContext.bind(this);
        this.onClickDelete = this.onClickDelete.bind(this);
    }

    componentDidMount() {
        this.authContext = this.context;
        this.refresh();
    }

    refresh() {
        app.get('/about.json').then((aboutResponse) => {
            app.get('/context/all', config(this.authContext.getToken())).then((response) => {
                this.setState({
                    contexts: response.data,
                    services: aboutResponse.data.server.services,
                    loading: false,
                })
            });
        });
    }

    onClickSelectServiceIcon(service) {
        console.log(service);
        this.setState({
            selectedService: service,
        })
    }

    showServicesSelectIcon() {
        if (this.state.services === undefined)
            return;

        return (<Grid container textAlign={"center"} alignItems={"center"}>
                {this.state.services.map((service, key) => {
                    return (
                        <Grid item key={key}>
                            <Box sx={{ mx: 2 }}>
                                <IconButton onClick={() => this.onClickSelectServiceIcon(service)}>
                                    <img src={`https://localhost:8080/static/${service.icon}`} width={80} alt="Loarding . . ." />
                                </IconButton>
                            </Box>
                        </Grid>
                    )
                })}
            </Grid>)
    }

    showContextWithFilter() {
        if (this.state.selectedService === undefined || this.state.contexts === undefined)
            return
        const namedContext = this.state.contexts.find((context) => context.service === this.state.selectedService.type);
        if (namedContext.count === 0)
            return (<Typography sx={{m: 4}} fontFamily={"Roboto"} fontWeight={"500"} fontSize={28}>No available context for service {this.state.selectedService.name}. try to create a new one !</Typography>)

        return <Grid container sx={{mx: 4, mt: 8, mb: 8}}>
            {namedContext.contexts.map((context, index) => {
                return (<Grid item md={3} key={index} textAlign={"start"}>
                    <Card sx={{mx: 2, backgroundColor: this.state.selectedService.color}}>
                        <CardHeader
                            action={<IconButton onClick={() => this.onClickDelete(context)}><FaTrash color={"white"}/></IconButton>}>
                        </CardHeader>



                        <CardContent>
                            <Typography color={"white"} style={{ wordWrap: "break-word" }} fontSize={24}><b>{context.title}</b></Typography>
                            <Typography color={"white"} fontSize={20} style={{ wordWrap: "break-word" }}>{context.description}</Typography>
                        </CardContent>
                        <CardActions>
                            <Typography color={"white"}>
                                {new Date(Date.parse(context.created_date)).toLocaleDateString("fr-FR")}
                            </Typography>
                            <Typography color={"white"}>
                                {new Date(Date.parse(context.created_date)).toLocaleTimeString("fr-FR")}
                            </Typography>
                        </CardActions>
                    </Card>
                </Grid>)
            })}
        </Grid>
    }

    openDialog() {
        this.setState({
            dialog: this.state.selectedService.type
        })
    }

    showContextDialogs() {
        if (this.state.dialog === undefined)
            return
        const dialogs = {
            github: <GithubNewContextDialog service={this.state.selectedService} onClose={this.closeDialog} onCreate={this.onCreateContext}/>,
            discord: <DiscordNewContextDialog service={this.state.selectedService} onClose={this.closeDialog} onCreate={this.onCreateContext}/>
        }
        return dialogs[this.state.dialog];
    }

    closeDialog() {
        this.setState({
            dialog: undefined
        })
    }

    onCreateContext() {
        this.setState({
            dialog: undefined,
            loading: true,
        });
        this.refresh();
    }

    onClickDelete(context) {
        app.delete(`/context/?key=${context.uuid}&service=${this.state.selectedService.type}`, config(this.context.getToken())).then((response) => {
            this.refresh();
        }).catch((err) => {
            console.log(err);
        })
    }

    showCreateButton() {
        if (this.state.selectedService === undefined)
            return;
        return <Button variant={"contained"} endIcon={<FaPlusCircle color={"white"} />} onClick={() => this.openDialog()}>
                Create new context
        </Button>
    }

    render() {
        return (this.pageRender(this, function RenderContextPropertyPage({ component }) {
            const menu = {
                right: [
                    {
                        name: 'Create',
                        style: Style.roundButtonFull,
                        variant: "contained",
                        action: () => component.setRedirectUrl({ url: "/area/applets/add" })
                    },
                    {
                        name: 'Services',
                        // action: () => component.setRedirectUrl({ url: "/area/context" })
                    },
                    {
                        name: 'Profile',
                        action: () => component.setRedirectUrl({ url: "/area/profile" })
                    },
                ],
                left: {
                    action: () => component.setRedirectUrl({ url: "/area/dashboard" })
                }
            }

            return (
                <ThemeProvider theme={theme}>
                    {component.showContextDialogs()}
                    <CssBaseline />
                    <Header component={component} menu={menu} />
                    <div style={Style.container}>
                        Services
                    </div>
                    <Paper sx={{m: 4, p:2, borderRadius: 2}}>
                        <Box sx={{alignItems: "center", justifyContent: "center", textAlign: "center", marginLeft: 'auto', marginRight: 'auto'}}>
                            {component.showServicesSelectIcon()}
                            {component.showContextWithFilter()}
                            {component.showCreateButton()}
                        </Box>
                    </Paper>
                </ThemeProvider>
            )
        }))
    }
}
