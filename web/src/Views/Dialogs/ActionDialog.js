import React from "react";
import {CircularProgress, Dialog, List, ListItem, ListItemText} from "@mui/material";
import app from "../../Components/utils/Axios";

export default class ActionDialog extends React.Component {

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

    showActions() {
        if (this.state.services === undefined)
            return (<CircularProgress/>);

        return (
            <List>
                {this.state.services.map((service, indexS) => {
                    return service.actions.map((action, indexA) => {
                        return (<ListItem button key={`${indexS}:${indexA}`}><ListItemText>{service.name} - {action.name}</ListItemText></ListItem>)
                    });
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
                    {this.showActions()}
                </Dialog>
            </div>
        );
    }
}
