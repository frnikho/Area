import {ActionSettingsDialog} from "../../ActionSettingsDialog";
import {Box, Button, MenuItem, Select, Typography} from "@mui/material";

export default class DiscordChannelDeletedDialog extends ActionSettingsDialog {

    constructor(props) {
        super(props);
        this.state = {
            channelType: 'GUILD_TEXT'
        }
        this.onCreate = this.onCreate.bind(this);
    }

    renderDialogContent() {
        return (
            <Box sx={{mt: 2}}>
                <Typography fontFamily={"Roboto"} fontWeight={"500"} fontSize={18}>Channel type</Typography>
                <Select
                    value={this.state.channelType}
                    label="Channel type"
                    onChange={(event) => this.setState({channelType: event.target.value})}>
                    <MenuItem value={"GUILD_TEXT"}>Text</MenuItem>
                    <MenuItem value={20}>Voice</MenuItem>
                </Select>
            </Box>
        )
    }

    onCreate() {
        const guildId = this.state.contexts.find((context) => context.uuid === this.state.selectedContextUuid).tokenData.token['guild']['id'];
        const action = {
            action_type: "discord_channel_deleted",
            base_key: guildId,
            action: {
                parameters: [
                    {
                        name: "guild_id",
                        value: guildId,
                    },
                    {
                        name: "channel_type",
                        value: this.state.channelType
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

DiscordChannelDeletedDialog.propTypes = ActionSettingsDialog.propTypes;

