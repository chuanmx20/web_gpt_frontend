import React from "react";
import { Avatar, TextField } from "@mui/material";
import "./Message.css"

export class Message extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const re = /(\n)+/g
        return (
            <>
                {this.props.message.role == "assistant" && (
                    <div className="bubble left">
                        <div className="avatar"><Avatar alt="ChatGPT" src={require("./imgs/chatgpt_icon.png")} /></div>
                        <div className="wrap">
                            <span className="content" dangerouslySetInnerHTML={{__html: this.props.message.content.replaceAll(re, '<br/>')}} />
                        </div>
                    </div>
                )}
                {this.props.message.role == "user" && (
                    <div className="bubble right">
                        <div className="avatar"><Avatar alt="USER"/></div>
                        <div className="wrap">
                            <span className="content" dangerouslySetInnerHTML={{__html: this.props.message.content.replaceAll(re, '<br/>')}} />
                        </div>
                    </div>
                )}
            </>
        )
    }
}
