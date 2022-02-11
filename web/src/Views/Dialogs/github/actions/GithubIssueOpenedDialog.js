import React from "react";
import GithubListingRepoDialog from "../GithubListingRepoDialog";
import {Button} from "@mui/material";

export default class GithubIssueOpenedDialog extends GithubListingRepoDialog {

    constructor(props) {
        super(props);
        this.state = {
            selectedRepository: undefined,
        }
        this.onCreate = this.onCreate.bind(this);
    }

    renderParams() {

    }

    onCreate() {
        const action = {
            action_type: "github_issue_opened",
            base_key: this.state.selectedRepository,
            action: {
                parameters: [
                    {
                        name: "repository_name",
                        value: this.state.selectedRepository,
                    }
                ]
            }
        }
        this.props.onActionCreated(action);
    }

    onRepositorySelected(repository) {
        if (repository !== '') {
            this.setState({selectedRepository: repository});
        }
    }

    renderCreateButton() {
        return (<Button variant={"contained"} disabled={this.state.repository !== undefined} onClick={this.onCreate}>Create</Button>)
    }


}
