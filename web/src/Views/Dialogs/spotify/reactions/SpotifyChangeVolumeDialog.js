import React from "react";
import {ReactionSettingsDialog} from "../../ReactionSettingsDialog";
import {Box, Button, Slider} from "@mui/material";
import {AuthContext} from "../../../../Contexts/AuthContext";
import {VolumeDown, VolumeUp} from "@mui/icons-material";
import Stack from "@mui/material/Stack";

export default class SpotifyChangeVolumeDialog extends ReactionSettingsDialog {

    static contextType = AuthContext

    constructor(props) {
        super(props);
        this.state = {
            volume: 50,
        }
    }

    onCreate() {
        const reaction = {
            type: "spotify_change_volume",
            base_key: this.state.selectedContextUuid,
            parameters: [
                {
                    name: "context_uuid",
                    value: this.state.selectedContextUuid,
                },
                {
                    name: "user_uuid",
                    value: this.context.getUser()['uuid'],
                },
                {
                    name: "volume",
                    value: this.state.volume,
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
                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                    <VolumeDown />
                    <Slider aria-label="Volume" value={this.state.volume} onChange={(event, volume) => this.setState({volume: volume})} />
                    <VolumeUp />
                </Stack>
            </Box>
        </Box>)
    }
}
