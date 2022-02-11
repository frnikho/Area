import {AuthContext} from "../../../../Contexts/AuthContext";
import {Button} from "@mui/material";
import GithubListingRepoDialog from "../GithubListingRepoDialog";
import React from "react";
import axios from "axios";
import {config} from "../../../../Utils/Axios";

export default class GithubRepositoryDeletedDialog extends GithubListingRepoDialog {

    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            valid: false,
            user: undefined,
        }
        this.onGithubLogged = this.onGithubLogged.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    onLoggedWithGithub(data) {
        axios.get(`https://api.github.com/user`, config(data.token.access_token)).then((response) => {
            console.log(response.data);
            this.setState({
                user: response.data,
                valid: true
            })
        });
        return false;
    }

    onCreate() {
        const action = {
            action_type: "github_repository_deleted",
            base_key: this.state.user.login,
            action: {
                parameters: [
                    {
                        name: "owner_login",
                        value: this.state.user.login,
                    }
                ]
            }
        }
        this.props.onActionCreated(action);
    }

    loginToGithub() {

    }

    renderCreateButton() {
        return (<Button variant={"contained"} disabled={!this.state.valid} onClick={this.onCreate}>Create</Button>)

    }

    showRepositoryList() {
        return <></>;
    }
}
