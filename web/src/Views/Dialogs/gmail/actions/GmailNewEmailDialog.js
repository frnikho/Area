import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button, MenuItem, Select, Typography} from "@mui/material";
import app from "../../../../Utils/Axios";

export default class GmailNewEmailDialog extends ActionSettingsDialog {

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
        const context = this.state.contexts.find((context) => context.uuid === this.state.selectedContextUuid);
        console.log(context);
        app.post(`services/google/watchGmail?context_uuid=${this.state.selectedContextUuid}&user_uuid=${this.context.getUser()['uuid']}`).then((response) => {
            const action = {
                action_type: "gmail_new_email",
                base_key: this.state.selectedContextUuid,
                action: {
                    parameters: [
                        {
                            name: "gmail_email",
                            value: context.tokenData.token.email,
                        },
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
        }).catch((err) => console.log(err));
    }

    renderCreateButton() {
        return <Button variant={"contained"} onClick={this.onCreate} disabled={this.state.selectedContextUuid === undefined}>Create</Button>
    }


}

GmailNewEmailDialog.propTypes = ActionSettingsDialog.propTypes;

