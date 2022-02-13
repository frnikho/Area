import React from "react";
import { Dialog, } from "@mui/material";

import Style from "../../Resources/Styles/styleHelpDialog"

export default class HelpDialog extends React.Component {
    // eslint-disable-next-line
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <Dialog
                    open={true}
                    maxWidth={"lg"}
                    fullWidth={true}
                    onClose={() => this.props.onClose()}>
                    <div style={Style.rect}>
                        <div style={Style.description}>
                            <div style={{ fontSize: "50px" }}>
                                What is an Applet?
                            </div>
                            <div style={Style.littleSpace} />
                            <div style={{ fontSize: "20px" }}>
                                An Applet connects two or more apps or devices together. It's an automation or integration/connection between two services that enables you to do something that those services couldn't do on their own.
                                Applets are composed of triggers and actions
                                <div style={Style.littleSpace} />

                                Triggers tell an Applet to start, and actions are the end result of an Applet run
                                <div style={Style.littleSpace} />
                                To use an Applet, you'll need to create a free IFTTT account. Then you'll need to connect your apps and devices to IFTTT, so we can help them talk to each other.
                            </div>
                        </div>
                    </div>
                </Dialog>

            </div>
        );
    }
}
