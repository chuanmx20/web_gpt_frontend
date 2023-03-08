import React from "react";
import { Avatar } from "@mui/material";

export class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div>
            { this.props.message.role == 'assistent' && (
                <>
                    <p>assistent</p>
                </>
            )}
            {this.props.message.role == 'user' && (
                <>
                    <p>user</p>
                </>
            )}
        </div>
        )
    }
}
