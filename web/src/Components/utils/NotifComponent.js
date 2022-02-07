import * as React from 'react';
import Alert from '@mui/material/Alert';

const RenderNotifComponent = ({ notif }) => {
    var severity = "success";

    if (notif.type === "error")
        severity = "warning";
    return (
        <Alert variant="filled" severity={severity}>
            {notif.message}
        </Alert>
    );
};

export default class NotifComponent extends React.Component {

    constructor(props) {
        super(props);
        this.notification = props
    }

    render() {
        return (
            <>
                {this.notification !== undefined ? <RenderNotifComponent notif={this.notification} /> : null}
            </>
        )
    }
}

export class TimeNotifComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            notification: props
        }
    }

    componentDidMount() {
        setTimeout(() => this.setState({notification: undefined}), 5000)
    }

    render() {
        return (
            <>
                {this.state.notification !== undefined ? <RenderNotifComponent notif={this.state.notification} /> : null}
            </>
        )
    }
}