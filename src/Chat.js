import React from "react";
import { Box, Stack } from "@mui/system";
import { Paper } from "@mui/material";
import {  Message } from "./Message"
import "./Chat.css"

export class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    // messages = this.props.data.map((message, id) => {
    //     return <Message message={message}/>
    // })
    componentDidUpdate() {
        const box = document.getElementById('box');
        if (box != undefined)
            box.scrollTo(0, box.scrollHeight)
    }
    render() {
        return (
            <Box className="container" id="box">
                <Stack spacing={4} className="stack">
                    {
                        this.props.data.map(function (message, index) {
                            return <Message key={index} message={message} />
                        })
                    }
                </Stack>
            </Box>
        )
    }
}