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
    render() {
        return (
            <div className="search-container">
            <div className="search">
                <TextField
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
                <div className="button-container">
                    <button onClick={this.send} />
                </div>
            </div>
            </div>
            
        )
    }
}
