import {ActionSettingsDialog} from "./actions/ActionSettingsDialog";
import {AuthContext} from "../../../Contexts/AuthContext";
import {Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Typography} from "@mui/material";
import {FaGithub, FaLock} from "react-icons/fa";
import GithubServiceOauth from "../../../Components/oauth/GithubServiceOauth";
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
        this.onGithubLogged = this.onGithubLogged.bind(this);
    }

    onGithubLogged(data) {
        this.setState({token: data});
        if (this.onLoggedWithGithub(data) === true) {
            app.post('services/github/list', {
                tokenKey: data.key
            }, config(this.context.getToken())).then((response) => {
                this.setState({
                    repositories: response.data,
                    selectedRepository: '',
                })
            }).catch(err => console.log(err));
        }
    }

    onLoggedWithGithub(data) {
        return true;
    }

    showRepositoryList() {
        if (this.state.repositories === undefined || this.state.token === undefined)
            return (<Select disabled={true} label={"Repository"} placeholder={"Repository"} value="Repository" sx={{width: 300}}>
                <MenuItem value={"Repository"}>Repository</MenuItem>
            </Select>)
        return (
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
                <Box sx={{m: 2}}>
                    <Typography fontFamily={"Roboto"}>Before using applets you need to install the yep github application:
                        <b>https://github.com/apps/yep-service/installations/new</b>
                    </Typography>
                </Box>
                <Box sx={{my: 2}}>
                    <GithubServiceOauth
                        icon={<FaGithub/>}
                        onSuccess={this.onGithubLogged}
                        valid={this.state.token !== undefined}
                        tokenUrl={`${process.env.REACT_APP_BACKEND_URL}/services/github/callback`}/>
                </Box>
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
