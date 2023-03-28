import React from "react";
import './Search.css'

import { TextField,Button } from "@mui/material";

export class Search extends React.Component {
    constructor(props) {
        super(props)
    }

    send = () => {
        const input = document.getElementById("input");
        const message = input.value;
        input.value = "";
        if (message.trim('\s') == "") {
            alert("Invalid input!");
            return;
        }
        this.props.send(message.replace('\n', '\n\n'));
    }

    clear = () => {
        this.props.clear();
    }
    componentDidUpdate() {
        var input = document.getElementById('input');
        input.focus();
    }
    render() {
        return (
            <div className="search-container">  
                <div className="search">
                    <div className="button-clear">
                        <button className="clear" disabled={this.props.loading} onClick={this.clear} />
                    </div>  
                    <TextField
                        disabled={this.props.loading}
                        multiline
                        maxRows={5} 
                        className="input"
                        placeholder="Say something!"
                        id="input"
                        onKeyDown={(event) => {
                            if (event.key == "Enter" && !event.shiftKey) {
                                this.send();
                                event.preventDefault();
                            }
                        }}
                    />
                    <div className="button-send">
                        <button className="send" disabled={this.props.loading} onClick={this.send} />
                    </div>
                </div>
            </div>
            
        )
    }
}
