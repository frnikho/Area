import {AuthContext} from "../../../../Contexts/AuthContext";
import {Button} from "@mui/material";
import GithubListingRepoDialog from "../GithubListingRepoDialog";
import React from "react";
import app, {config} from "../../../../Utils/Axios";

export default class GithubRepositoryCreatedDialog extends GithubListingRepoDialog {

    static contextType = AuthContext;

    constructor() {
        super();
        this.state = {
            user: undefined,
        }
        this.onCreate = this.onCreate.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedContextUuid !== prevState.selectedContextUuid) {
            this.getUser();
        }
    }

    getUser() {
        if (this.state.selectedContextUuid === undefined)
            return;
        app.get(`/services/github/user?context=${this.state.selectedContextUuid}`, config(this.context.getToken())).then((response) => {
            console.log(response.data);
            this.setState({
                user: response.data
            })
        }).catch(err => console.log(err));
    }

    onCreate() {
        const action = {
            action_type: "github_repository_created",
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

    renderCreateButton() {
        return (<Button variant={"contained"} disabled={this.state.user === undefined} onClick={this.onCreate}>Create</Button>)
    }

    showRepositoryList() {
        return <></>;
    }
}
