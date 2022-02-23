import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button} from "@mui/material";

export default class EpitechNewNotificationDialog extends ActionSettingsDialog {

    constructor(props) {
        super(props);
        this.state = {
            notificationType: 'all'
        }
        this.onCreate = this.onCreate.bind(this);
    }

    onCreate() {
        const token = this.state.contexts.find((context) => context.uuid === this.state.selectedContextUuid).tokenData.token;
        const action = {
            action_type: "intra_new_notifications",
            base_key: token['url'],
            action: {
                parameters: [
                    {
                        name: "login_link",
                        value: token['url'],
                    },
                    {
                        name: "notification_type",
                        value: this.state.notificationType
                    }
                ]
            }
        }
        this.props.onActionCreated(action);
    }

    renderCreateButton() {
        return <Button variant={"contained"} onClick={this.onCreate} disabled={this.state.selectedContextUuid === undefined}>Create</Button>
    }

    renderDialogContent() {
        return (
            <Box>
                
            </Box>
        )
    }
}
