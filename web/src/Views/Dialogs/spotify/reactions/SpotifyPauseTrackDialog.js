import React from "react";
import {ReactionSettingsDialog} from "../../ReactionSettingsDialog";
import {Box, Button} from "@mui/material";
import {AuthContext} from "../../../../Contexts/AuthContext";

export default class SpotifyPauseTrackDialog extends ReactionSettingsDialog {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            channels: undefined,
        }
    }


    onCreate() {
        const reaction = {
            type: "spotify_pause_track",
            base_key: this.state.selectedContextUuid,
            parameters: [
                {
                    name: "context_uuid",
                    value: this.state.selectedContextUuid,
                },
                {
                    name: "user_uuid",
                    value: this.context.getUser()['uuid'],
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
            </Box>
        </Box>)
    }
}
