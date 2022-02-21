import React from "react";
import {Box, Button, Dialog, DialogActions, DialogContent, IconButton, TextField, Typography} from "@mui/material";
import PropTypes from "prop-types";
import {MdClose} from "react-icons/md";
import app, {config} from "../../../Utils/Axios";
import {AuthContext} from "../../../Contexts/AuthContext";

export default class NewContextDialog extends React.Component {

    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            tokenData: undefined,
            valid: false,
        }
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.checkButton = this.checkButton.bind(this);
        this.onClickCreate = this.onClickCreate.bind(this);
    }

    onChangeTitle(event) {
        this.setState({
            title: event.target.value
        });
    }

    onChangeDescription(event) {
        this.setState({
            description: event.target.value
        })
    }

    checkButton() {

    }

    render() {
        return (
            <Dialog
                open={true}
                maxWidth={"lg"}
                fullWidth={true}
                onClose={() => this.props.onClose()}>
                <DialogActions sx={{height: 40}}>
                    <IconButton onClick={() => this.onClose()}><MdClose color={"black"}/></IconButton>
                </DialogActions>
                <Box textAlign={"start"} sx={{mx: 4}}>
                    <Typography fontFamily={"Roboto"} fontSize={34} fontWeight={"700"}>
                       New {this.props.service.name} context
                    </Typography>
                </Box>
                <DialogContent>
                    <Typography fontSize={20}>Title</Typography>
                    <TextField fullWidth label="Title" id={"title"} required={true} sx={{my: 2}} onChange={this.onChangeTitle}/>

                    <Typography fontSize={20}>Description</Typography>
                    <TextField fullWidth label="Description" id={"description"} multiline={true} minRows={5} sx={{my: 2}} onChange={this.onChangeDescription}/>

                    {this.renderContextLogin()}
                </DialogContent>
                <DialogActions>
                    {this.renderCreateButton(this.state.valid)}
                </DialogActions>
            </Dialog>
        );
    }

    renderContextLogin() {

    }

    onClickCreate(tokenData, fnc) {
        app.post('/context', {
            title: this.state.title,
            description: this.state.description,
            token_data: tokenData,
            service: this.props.service.type
        }, config(this.context.getToken())).then((response) => {
            console.log(response.data);
            fnc();
        }).catch((err) => {
            console.log(err);
        });
    }

    renderCreateButton(valid, fnc) {

    }
}

NewContextDialog.propTypes = {
    service: PropTypes.object.isRequired,
    onClose: PropTypes.func.isRequired,
}
