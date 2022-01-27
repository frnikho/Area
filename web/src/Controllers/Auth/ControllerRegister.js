import React from "react";
import RegisterPage from "../../Views/Auth/RegisterPage.js"
import Google from "../../Models/Auth/Google.js"
import Github from "../../Models/Auth/Github.js"
import { AuthContext } from "../../Contexts/AuthContext";
import { Navigate } from "react-router-dom";


export default class ControllerRegister extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            redirectUrl: undefined,
            notification: undefined,
        }

        this.cookies = props;
        this.handleSubmit = this.handleSubmit.bind(this)
        this.registerDb = this.registerDb.bind(this)
        this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);
        this.onClickGithubLogin = this.onClickGithubLogin.bind(this);
        this.setNotification = this.setNotification.bind(this)
        this.setRedirectUrl = this.setRedirectUrl.bind(this)
    }

    setRedirectUrl(url) {
        this.setState({ redirectUrl: url })
    }

    componentDidMount() {
        this.auth = this.context;
    }

    setNotification(value) {
        this.setState({ notification: value });
    }

    onClickGoogleLogin(response) {
        if (response.error) {
            // temporay
            if (response.error !== "idpiframe_initialization_failed")
                this.setNotification({ message: "Error with google", show: true, type: "error" });
        } else {
            Google.connect(response);
        }
    }

    onClickGithubLogin(response) {
        if (response.error) {
            this.setNotification({ message: "Error with Github", show: true, type: "error" });
            console.log(response.error)
        } else {
            Github.connect()
        }
    }

    registerDb(email, firstname, lastname, password) {
        this.auth.register({ firstname: firstname, lastname: lastname, email: email, password: password }, () => {
            this.setState({
                redirectUrl: '/auth/login',
            });
            this.setNotification("Register !");
        }, (err) => {
            console.log(err);
            this.setNotification(err.message);
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        if (!data.has('firstname') || data.get('firstname') === "")
            return this.setNotification({ message: "Firstname cannot be empty !", show: true, type: "error" });
        if (!data.has('lastname') || data.get('lastname') === "")
            return this.setNotification({ message: "Lastname cannot be empty !", show: true, type: "error" });
        if (!data.has('email') || data.get('email') === "")
            return this.setNotification({ message: "Email cannot be empty !", show: true, type: "error" });
        if (!data.has('password') || data.get('password') === "")
            return this.setNotification({ message: "Password cannot be empty !", show: true, type: "error" });
        if (!data.has('confpassword') || data.get('confpassword') === "" || data.get('confpassword') !== data.get('password'))
            return this.setNotification({ message: "Passwords are not the same !", show: true, type: "error" });
        this.registerDb(data.get('email'), data.get('firstname'), data.get('lastname'), data.get('password'));
    }

    render() {
        return (
            <>
                <RegisterPage {...this} />
                {this.state.redirectUrl !== undefined ? <Navigate to={this.state.redirectUrl} /> : null}
            </>
        )
    }

}
