import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button, TextField, Typography} from "@mui/material";

export default class DiscordGuildMessageReceivedDialog extends ActionSettingsDialog {

    constructor(props) {
        super(props);
        this.state = {
            userId: '',
        }
        this.onCreate = this.onCreate.bind(this);
    }

    renderDialogContent() {
        return (
            <Box sx={{mt: 2}}>
                <Typography fontFamily={"Roboto"} fontWeight={"500"} fontSize={18}>Discord user id:</Typography>
                <TextField value={this.state.userId} onChange={(event) => this.setState({userId: event.target.value})}/>
            </Box>
        )
    }

    onCreate() {
        const guildId = this.state.contexts.find((context) => context.uuid === this.state.selectedContextUuid).tokenData.token['guild']['id'];
        const action = {
            action_type: "discord_guild_message_received",
            base_key: guildId,
            action: {
                parameters: [
                    {
                        name: "guild_id",
                        value: guildId,
                    },
                    {
                        name: "user_id",
                        value: this.state.userId,
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

DiscordGuildMessageReceivedDialog.propTypes = ActionSettingsDialog.propTypes;

