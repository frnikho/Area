import React from "react";
import {withLocation} from "../../Utils/NavigateTools";
import app from "../../Utils/Axios";
import {Box, CircularProgress, CssBaseline, Typography} from "@mui/material";
import Lottie from "lottie-react";
import successAnimation from "../../Resources/JSON/anim_congratulations.json"

class VerifyPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            valid: undefined,
            error: undefined,
        }
    }

    componentDidMount() {
        const uri = new URLSearchParams(this.props.location.search);
        const token = uri.get('token');
        const userUuid = uri.get('userUuid');
        app.post('/auth/verify', {
            userUuid,
            token,
        }).then((response) => {
            this.setState({valid: true});
        }).catch((error) => {
            this.setState({valid: false, error: error.response.data});
            console.log(error.response.data);
        });
    }

    showLoading() {
        if (this.state.valid === undefined) {
            return <CircularProgress/>
        }
    }

    showAnimation() {
        if (this.state.valid !== true)
            return;
        return (
            <Box maxWidth={600} style={{height: "100%"}}>
                <Typography fontSize={50} color={"white"} fontFamilty={"Roboto"}><b>Your account is verified !</b></Typography>
                <Lottie animationData={successAnimation} loop={true}/>
            </Box>)
    }

    render() {
        return (
            <CssBaseline>
                <Box sx={{backgroundColor: "#2ecc71", margin: "auto", padding: "auto"}}>
                    {this.showLoading()}
                    {this.showAnimation()}
                </Box>
            </CssBaseline>
        );
    }
}

export default withLocation(VerifyPage)
