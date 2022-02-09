import {SystemDialog} from "../SystemDialog";
import {Box, Button} from "@mui/material";
import {FaGithub} from "react-icons/fa";
import OAuth2Login from "react-simple-oauth2-login";
import app from "../../../Components/utils/Axios";

export default class GithubNewPushRepositoryDialog extends SystemDialog {

    constructor(props) {
        super(props);
        this.state = {
            user: undefined,
        }
        this.login = this.login.bind(this);
    }

    login() {

    }

    onSuccess(data) {
        console.log(data.code);


        app.post('').then(() => {

        });
    }

    buildUrl() {
        return `https://github.com/login/oauth/authorize?client_id=${process.env.REACT_APP_GITHUB_SERVICES_CLIENT_ID}&scope=repo%20admin:repo_hook`
    }

    showLoginPopup() {

        return (<OAuth2Login
            authorizationUrl="https://github.com/login/oauth/authorize"
            clientId={process.env.REACT_APP_GITHUB_SERVICES_CLIENT_ID}
            responseType="code"
            redirectUri="http://localhost:3000/services/auth/github/callback"
            scope={"repo%20admin:repo_hook"}
            onSuccess={this.onSuccess}
            onFailure={(abc) => console.log("ERROR", abc)}
            render={renderProps => (
                <Button variant={"outlined"} endIcon={<FaGithub/>} onClick={renderProps.onClick}>Login to github</Button>
            )}
        />)
    }

    renderDialogContent() {
        return (
            <Box sx={{my: 2}}>
                {this.showLoginPopup()}
            </Box>
        )
    }
}
