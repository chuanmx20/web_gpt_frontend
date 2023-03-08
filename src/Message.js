import React from "react";
import { Avatar } from "@mui/material";
import "./Message.css"

export class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <>
                {this.props.message.role == "assistant" && (
                    <div className="bubble left">
                        <div className="avatar"><Avatar alt="ChatGPT" src={require("./imgs/chatgpt_icon.png")} /></div>
                        <div className="wrap">
                            <div className="content">{this.props.message.content}</div>
                        </div>
                    </div>
                )}
                {this.props.message.role == "user" && (
                    <div className="bubble right">
                        <div className="avatar"><Avatar alt="USER"/></div>
                        <div className="wrap">
                            <div className="content">{this.props.message.content}</div>
                        </div>
                    </div>
                )}
            </>
        )
    }
}
