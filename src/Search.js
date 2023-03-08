import React from "react";
import './Search.css'

import { TextField,Button } from "@mui/material";

export class Search extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <div className="search">
                <TextField
                    multiline
                    maxRows={5} 
                    className="input"
                    placeholder="Say something!"
                />
                <div className="button-container">
                    <button />
                </div>
            </div>
            
        )
    }
}
