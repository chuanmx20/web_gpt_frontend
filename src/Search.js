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
        this.props.send(message);
    }
    render() {
        return (
            <div className="search">
                <TextField
                    multiline
                    maxRows={5} 
                    className="input"
                    placeholder="Say something!"
                    id="input"
                />
                <div className="button-container">
                    <button onClick={this.send} />
                </div>
            </div>
            
        )
    }
}
