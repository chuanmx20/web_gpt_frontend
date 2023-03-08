import React from "react";
import { LoginControl } from './login'
import { Search } from "./Search";
// import { get_json } from "./utils/functions";

export class PageContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      search_text: null,
      token: localStorage['TOKEN'] || null,
      data: undefined,
    };

    if (localStorage['TOKEN']) {
      this.fetch_record(localStorage['TOKEN']);
    }
  }
  
  fetch_record(token) {
    var data = {
      context: [
        {
          role: 'user',
          content: 'Q1',
        },
        {
          role: 'assistent',
          content: 'A1',
        },
        {
          role: 'user',
          content: 'Q2'
        },
        {
          role: 'assistent',
          content: 'A2'
        }
      ]
    }
    this.update_list(data)
  }
  update_list(data) {
    this.setState({
      data: data
    })
  }
  send_message(message) {
    console.log(message)
  }
  render() {
    return (
      <>
        <LoginControl
          token_callback={(x) => {
            console.log(`${x} is set as token!`)
            localStorage['TOKEN'] = x || '';
            this.setState({
              token: x,
            })
          }}
        />
        <Search
          send={this.send_message}
        />
      </>
    )
  }
}