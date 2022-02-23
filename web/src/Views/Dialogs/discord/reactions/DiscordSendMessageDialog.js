import React from "react";
import {ReactionSettingsDialog} from "../../ReactionSettingsDialog";
import {Box, Button, Chip, FormControl, InputLabel, MenuItem, Select, TextField, Typography} from "@mui/material";
import {FaLock} from "react-icons/fa";
import app, {config} from "../../../../Utils/Axios";
import {AuthContext} from "../../../../Contexts/AuthContext";

export default class DiscordSendMessageDialog extends ReactionSettingsDialog {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            channels: undefined,
            text: '',
            selectedChannel: '',
        }
        this.onChannelSelected = this.onChannelSelected.bind(this);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.selectedContextUuid !== prevState.selectedContextUuid) {
            this.loadChannels();
        }
    }

    loadChannels() {
        const auth = this.context;
        app.get(`services/discord/list?context=${this.state.selectedContextUuid}&service=discord`, config(auth.getToken())).then((response) => {
            console.log(response.data);
            this.setState({
                channels: response.data
            })
        }).catch(err => console.log(err.response.data));
    }

    onChannelSelected(channel) {
        console.log(channel);
    }

    onCreate() {
        const reaction = {
            type: "discord_send_chanel_message",
            base_key: this.state.selectedChannel,
            parameters: [
                {
                    name: "chanel_id",
                    value: this.state.selectedChannel,
                },
                {
                    name: "text",
                    value: this.state.text,
                }
            ]
        }
        this.props.onReactionCreated(reaction, this.props.reaction, this.props.service);
    }

    showSelect() {
        if (this.state.channels === undefined)
            return;
        return <FormControl>
            <InputLabel id="channel-select-label">Channel</InputLabel>
            <Select
                sx={{ width: 300 }}
                labelId="channel-select-label"
                id="channel-select"
                value={this.state.selectedChannel}
                label="Select a Channel"
                onChange={(event) => {
                    this.setState({ selectedChannel: event.target.value });
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
                            <Box sx={{ mx: 1 }}>
                                {channel.type === 2 ? <FaLock color={"grey"} /> : null}
                            </Box>
                        </MenuItem>)
                })}
            </Select>
        </FormControl>
    }

    showTextField() {
        if (this.state.channels === undefined)
            return;

        return (
            <Box sx={{ my: 2 }}>
                <Typography fontFamily={"Roboto"} fontWeight={"700"} fontSize={24}>Text</Typography>
                <Box sx={{ my: 2 }}>
                    <Typography fontFamily={"Roboto"}>
                        {this.props.action.about.name} <b>ingredients:</b>
                    </Typography>
                    {this.props.action.about.ingredients.map((ingredient, index) => {
                        return (<Chip sx={{ mx: 1 }} key={index} label={ingredient} onClick={() => console.log(ingredient)} />)
                    })}
                </Box>
                <Box>
                    <TextField id="outlined-basic" label="Text" variant="outlined" value={this.state.text} onChange={(event) => {
                        this.setState({
                            text: event.target.value
                        })
                    }} />
                </Box>
            </Box>
        )
    }

    renderCreateButton() {
        return (<Button variant={"contained"} onClick={() => this.onCreate()} disabled={this.state.selectedChannel === ''}>
            Create
        </Button>)
    }

    renderDialogContent() {
        return (<Box>
            <Box sx={{ mt: 4 }}>
                {this.showSelect()}
                {this.showTextField()}
            </Box>
        </Box>)
    }
}
