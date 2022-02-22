import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button, MenuItem, Select, TextField, Typography} from "@mui/material";

export default class DiscordGuildMessageReactionAddDialog extends ActionSettingsDialog {

    constructor(props) {
        super(props);
        this.state = {
            messageId: '',
        }
        this.onCreate = this.onCreate.bind(this);
    }

    renderDialogContent() {
        return (
            <Box sx={{mt: 2}}>
                <Typography fontFamily={"Roboto"} fontWeight={"500"} fontSize={18}>Discord message id:</Typography>
                <TextField value={this.state.userId} onChange={(event) => this.setState({userId: event.target.value})}/>
            </Box>
        )
    }

    onCreate() {
        const action = {
            action_type: "discord_guild_message_reaction_add",
            base_key: this.state.messageId,
            action: {
                parameters: [
                    {
                        name: "message_id",
                        value: this.state.messageId,
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

DiscordGuildMessageReactionAddDialog.propTypes = ActionSettingsDialog.propTypes;

