import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button} from "@mui/material";

export default class DiscordMemberBannedDialog extends ActionSettingsDialog {

    constructor(props) {
        super(props);
        this.onCreate = this.onCreate.bind(this);
    }

    renderDialogContent() {
        return (
            <Box sx={{mt: 2}}>

            </Box>
        )
    }

    onCreate() {
        const guildId = this.state.contexts.find((context) => context.uuid === this.state.selectedContextUuid).tokenData.token['guild']['id'];
        const action = {
            action_type: "discord_guild_member_banned",
            base_key: guildId,
            action: {
                parameters: [
                    {
                        name: "guild_id",
                        value: guildId,
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

DiscordMemberBannedDialog.propTypes = ActionSettingsDialog.propTypes;

