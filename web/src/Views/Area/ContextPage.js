import React from "react";
import {AuthContext} from "../../Contexts/AuthContext";
import app, {config} from "../../Utils/Axios";
import {Box, Grid, IconButton} from "@mui/material";

export default class ContextPage extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            services: undefined,
            selectedService: undefined,
            contexts: undefined
        }
        this.onClickSelectServiceIcon = this.onClickSelectServiceIcon.bind(this);
    }

    componentDidMount() {
        const auth = this.context;
        app.get('/about.json').then((response) => {
           this.setState({
               services: response.data.server.services
           })
        });

        app.get('/context/all', config(auth.getToken())).then((response) => {
            console.log(response.data);
           this.setState({
               contexts: response.data,
           })
        });

    }

    onClickSelectServiceIcon(serviceName) {
        console.log(serviceName);
        this.setState({
            selectedService: serviceName,
        })
    }

    showServicesSelectIcon() {
        if (this.state.services === undefined)
            return;
        return <Grid container textAlign={"center"} alignItems={"center"}>
            {this.state.services.map((service) => {
                return <Grid item>
                    <Box sx={{mx: 2}}>
                        <IconButton onClick={() => this.onClickSelectServiceIcon(service.type)}>
                            <img src={`https://localhost:8080/static/${service.icon}`} width={80} alt="Loarding . . ."/>
                        </IconButton>
                    </Box>
                </Grid>
            })}
        </Grid>
    }

    showContextWithFilter() {
        if (this.state.selectedService === undefined || this.state.contexts === undefined)
            return
        const namedContext = this.state.contexts.find((context) => context.service === this.state.selectedService);
        console.log(namedContext);
        return <h1>{namedContext.service}</h1>
    }

    render() {
        return (
            <Box>
                <h1>Hello</h1>
                {this.showServicesSelectIcon()}
                {this.showContextWithFilter()}
            </Box>
        );
    }

}
