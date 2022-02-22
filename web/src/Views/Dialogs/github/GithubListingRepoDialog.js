import {ActionSettingsDialog} from "../ActionSettingsDialog";
import {AuthContext} from "../../../Contexts/AuthContext";
import {Box, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {FaLock} from "react-icons/fa";
import React from "react";
import app, {config} from "../../../Utils/Axios";

export default class GithubListingRepoDialog extends ActionSettingsDialog {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            token: undefined,
            repositories: undefined,
            selectedRepository: '',
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedContextUuid !== prevState.selectedContextUuid) {
            console.log(this.state.selectedContextUuid)
            this.listRepositories();
        }
    }

    listRepositories() {
        app.get(`services/github/listRepositories?context=${this.state.selectedContextUuid}`, config(this.context.getToken())).then((response) => {
            console.log(response.data);
            this.setState({
                repositories: response.data,
                selectedRepository: '',
            })
        }).catch(err => console.log(err));
    }


    showRepositoryList() {
        if (this.state.repositories === undefined)
            return (<Select disabled={true} label={"Repository"} placeholder={"Repository"} value="Repository" sx={{width: 300}}>
                <MenuItem value={"Repository"}>Repository</MenuItem>
            </Select>)
        return (
            <Box>
                <Typography fontSize={20} fontFamily={"Roboto"}>Repository</Typography>
                <FormControl>
                    <InputLabel id="repository-select-label">Repository</InputLabel>
                    <Select
                        sx={{width: 300}}
                        labelId="repository-select-label"
                        id="repository-select"
                        value={this.state.selectedRepository}
                        label="Repository"
                        onChange={(event) => {
                            this.setState({selectedRepository: event.target.value});
                            this.onRepositorySelected(event.target.value);
                        }}>
                        <MenuItem value={''}>Choose a repository</MenuItem>
                        {this.state.repositories.map((repo, index) => {
                            return (
                                <MenuItem key={index} value={repo.full_name}>
                                    <Typography fontFamily={"Roboto"}>
                                        {repo.full_name}
                                    </Typography>
                                    <Box sx={{mx: 1}}>
                                        {repo.private === true ? <FaLock color={"grey"}/> : null}
                                    </Box>
                                </MenuItem>)
                        })}
                    </Select>
                </FormControl>
            </Box>
        )
    }

    onRepositorySelected(repository) {

    }

    getRepositorySelected() {
        return this.state.selectedRepository;
    }

    renderDialogContent() {
        return (
            <Box sx={{my: 2}}>
                <Box sx={{my: 2}}>
                    {this.showRepositoryList()}
                </Box>
                {this.renderParams()}
            </Box>
        )
    }

    renderParams() {
        return <></>
    }

    renderCreateButton() {

    }

}
