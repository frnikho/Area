import React from "react";
import {AuthContext} from "../Contexts/AuthContext";
import HomePage from "../Views/HomePage";

export default class Home extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            user: undefined,
        }
    }

    componentDidMount() {
        const auth = this.context;
        if (auth.getUser() === undefined) {
            this.setState({
                redirectUrl: '/auth/login'
            })
        } else {
            this.setState({
                user: auth.getUser()
            })
            this.setState({
                redirectUrl: '/area/dashboard'
            })
        }
    }

    render() {
        return (<HomePage {...this}/>);
    }


}
