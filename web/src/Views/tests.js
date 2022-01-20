import React from "react";

export default class Test extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: undefined,
            password: undefined,
        }
        this.handleEmailChange = this.handleEmailChange.bind(this)
        this.handlePasswordChange = this.handlePasswordChange.bind(this)
        this.onClickLogin = this.onClickLogin.bind(this)
    }

    onClickLogin() {
        console.log(this.email)
        console.log(this.password)
        this.handlePasswordChange("hello");
        console.log(this.email)
        console.log(this.password)
        console.log(this.state)
    }

    handleEmailChange(event) {
        this.setState({
            email: event
        })
    }

    handlePasswordChange(event) {
        this.setState({
            password: event
        })
    }

    render() {
        return (
            <div>
                {this.state.email}
                {this.state.password}
                <label>
                    Email
                    <input type="text" onChange={(e) => this.handleEmailChange(e.target.value)} />
                </label>
                <label>
                    Password
                    <input type="text" onChange={(e) => this.handlePasswordChange(e.target.value)} />
                </label>
                <button onClick={this.onClickLogin}>Login</button>

            </div>
        );
    }

}
