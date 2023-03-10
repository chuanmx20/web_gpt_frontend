import React from "react";
import { Avatar, TextField } from "@mui/material";
import "./Message.css"
import { marked } from "marked";

export class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    trim(str) {
        return marked(str);
    }
    render() {
        return (
            <>
                {this.props.message.role == "assistant" && (
                    <div className="bubble left">
                        <div className="avatar"><Avatar alt="ChatGPT" src={require("./imgs/chatgpt_icon.png")} /></div>
                        <div className="wrap">
                            <span className="content" dangerouslySetInnerHTML={{__html: this.trim(this.props.message.content)}} />
                        </div>
                    </div>
                )}
                {this.props.message.role == "user" && (
                    <div className="bubble right">
                        <div className="avatar"><Avatar alt="USER"/></div>
                        <div className="wrap">
                            <span className="content" dangerouslySetInnerHTML={{__html: this.trim(this.props.message.content)}} />
                        </div>
                    </div>
                )}
            </>
        )
    }
}
