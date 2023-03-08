import React from "react";
import { Container, Stack, Item } from "@mui/system";
import { Message } from "./Message"

export class Chat extends React.Component {
    constructor(props) {
        super(props);
    }
    // messages = this.props.data.map((message, id) => {
    //     return <Message message={message}/>
    // })
    render() {
        return (
            <Container fixed>
                <Stack spacing={4 }>
                    {this.props.data.map(function(message, index) {
                            return <Message key={index} message={message} />
                        })
                    }
                </Stack>
            </Container>
        )
    }
}