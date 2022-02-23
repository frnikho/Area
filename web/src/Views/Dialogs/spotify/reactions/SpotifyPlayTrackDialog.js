import React from "react";
import {ReactionSettingsDialog} from "../../ReactionSettingsDialog";
import {Box, Button, TextField} from "@mui/material";
import {AuthContext} from "../../../../Contexts/AuthContext";

export default class SpotifyPlayTrackDialog extends ReactionSettingsDialog {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            songUri: '',
        }
    }


    onCreate() {
        const reaction = {
            type: "spotify_play_track",
            base_key: this.state.selectedContextUuid,
            parameters: [
                {
                    name: "context_uuid",
                    value: this.state.selectedContextUuid,
                },
                {
                    name: "song_uri",
                    value: this.state.songUri,
                }
            ]
        }
        this.props.onReactionCreated(reaction, this.props.reaction, this.props.service);
    }


    renderCreateButton() {
        return (<Button variant={"contained"} onClick={() => this.onCreate()} disabled={this.state.selectedChannel === ''}>
            Create
        </Button>)
    }

    renderDialogContent() {
        return (<Box>
            <Box sx={{mt: 4}}>
                <TextField label={"spotify:album:5ht7ItJgpBH7W6vJ5BqpPr"} value={this.state.songUri} onChange={(event) => this.setState({songUri: event.target.value})}>Song uri</TextField>
            </Box>
        </Box>)
    }
}
