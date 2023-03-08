import React from "react";
import { LoginControl } from './login'
import { Search } from "./Search";
// import { get_json } from "./utils/functions";
import { Chat } from "./Chat"

export class PageContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      token: localStorage['TOKEN'] || null,
      data: [],
      verified_token: false,
    };
  }
  componentDidMount() {
    if (localStorage['TOKEN']) {
      this.fetch_record(localStorage['TOKEN']);
    }
  }
  fetch_record = (token)=>{
    var data = [
      {
        role: 'user',
        content: 'Q1',
      },
      {
        role: 'assistant',
        content: 'A1',
      },
      {
        role: 'user',
        content: 'Q2'
      },
      {
        role: 'assistant',
        content: 'A2'
      }
    ]
    this.update_list(data)
    this.setState({
      verified_token: true
    })
  }
  update_list(data) {
    this.setState({
      data: data
    })
  }
  send_message = (message)=>{
    console.log(message);
    this.state.data.push({ role: 'user', content: message });
  }
  render() {
    return (
      <>
        {!this.state.verified_token && (
          <LoginControl
            token_callback={(x) => {
              console.log(`${x} is set as token!`)
              localStorage['TOKEN'] = x || '';
              this.setState({
                token: x,
              })
            }}
          />
        )}
        {this.state.verified_token && (
          <>
            <Chat
              data={this.state.data}
            />
            <Search
              send={this.send_message}
            />
          </>
        )}
      </>
    )
  }
}