import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button} from "@mui/material";

export default class SpotifySongChangedDialog extends ActionSettingsDialog {

    constructor(props) {
        super(props);
        this.state = {

        }
        this.onCreate = this.onCreate.bind(this);
    }

    renderDialogContent() {
        return (
            <Box sx={{mt: 2}}>

            </Box>
        )
    }

    onCreate() {
        const action = {
            action_type: "spotify_song_changed",
            base_key: this.state.selectedContextUuid,
            action: {
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
        }
        this.props.onActionCreated(action);
    }

    renderCreateButton() {
        return <Button variant={"contained"} onClick={this.onCreate} disabled={this.state.selectedContextUuid === undefined}>Create</Button>
    }


}

SpotifySongChangedDialog.propTypes = ActionSettingsDialog.propTypes;

