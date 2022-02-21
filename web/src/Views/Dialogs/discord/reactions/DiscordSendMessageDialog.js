import React from "react";
import OAuth2Login from "react-simple-oauth2-login";
import {ReactionSettingsDialog} from "../../ReactionSettingsDialog";
import {Box, Button, FormControl, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import {FaDiscord, FaLock} from "react-icons/fa";
import app, {config} from "../../../../Utils/Axios";
import {AuthContext} from "../../../../Contexts/AuthContext";

export default class DiscordSendMessageDialog extends ReactionSettingsDialog {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            code: undefined,
            token: undefined,
            guildId: undefined,
            channels: undefined,
            selectedChannel: '',
        }
        this.onCloseOauth = this.onCloseOauth.bind(this);
        this.onSuccessOauth = this.onSuccessOauth.bind(this);
        this.onChannelSelected = this.onChannelSelected.bind(this);
    }

    onCloseOauth() {
        console.log("close discord oauth popup");
    }

    onSuccessOauth(data) {

        const auth = this.context;

        this.setState({
            guildId: data.guild_id
        })
        app.get(`services/discord/callback?code=${data.code}`, config(auth.getToken())).then((response) => {
            this.setState({
                token: response.data.token.token
            })
            this.loadChannels(data.guild_id);
        })
    }

    loadChannels(guildId) {
        const auth = this.context;
        console.log("load channels for guild: " + guildId);
        app.get(`services/discord/list?guild_id=${guildId}`, config(auth.getToken())).then((response) => {
            this.setState({
                channels: response.data
            })
        }).catch(err => console.log(err));
    }

    showDiscordOauth() {
        return (
            <OAuth2Login
                authorizationUrl={"https://discord.com/api/oauth2/authorize"}
                clientId={process.env.REACT_APP_DISCORD_CLIENT_ID}
                scope={"bot"}
                responseType={"code"}
                redirectUri={process.env.REACT_APP_DISCORD_REDIRECT_URL}
                extraParams={{ permissions: '8'}}
                onSuccess={this.onSuccessOauth}
                onFailure={this.onCloseOauth}
                render={(props) => {
                    return <Button disabled={this.state.token !== undefined} variant={"contained"} onClick={props.onClick} endIcon={<FaDiscord/>}>{this.state.token === undefined ? "Login Discord" : "Logged !"}</Button>
                }}
            />
        )
    }

    onChannelSelected(channel) {
        console.log(channel);
    }

    showSelect() {
        if (this.state.channels === undefined)
            return;
        return <FormControl>
            <InputLabel id="channel-select-label">Channel</InputLabel>
            <Select
                sx={{width: 300}}
                labelId="channel-select-label"
                id="channel-select"
                value={this.state.selectedChannel}
                label="Select a Channel"
                onChange={(event) => {
                    this.setState({selectedChannel: event.target.value});
                    this.onChannelSelected(event.target.value);
                }}>
                <MenuItem value={''}>Select a Channel</MenuItem>
                {this.state.channels.map((channel, index) => {
                    if (channel.type !== 0)
                        return null;
                    return (
                        <MenuItem key={index} value={channel.id}>
                            <Typography fontFamily={"Roboto"}>
                                {channel.name}
                            </Typography>
                            <Box sx={{mx: 1}}>
                                {channel.type === 2 ? <FaLock color={"grey"}/> : null}
                            </Box>
                        </MenuItem>)
                })}
            </Select>
        </FormControl>
    }

    renderCreateButton() {
        return (<Button variant={"contained"} onClick={() => this.props.onReactionCreated(this.state.selectedChannel, this.state.guildId)} disabled={this.state.selectedChannel === ''}>
            Create
        </Button>)
    }

    renderDialogContent() {
        return (<Box>
            {this.showDiscordOauth()}
            <Box sx={{mt: 4}}>
                {this.showSelect()}
            </Box>
        </Box>)
    }
}
