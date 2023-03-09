import React from "react";
import { LoginControl } from './login'
import { Search } from "./Search";
import { request } from "./utils/functions";
import { Chat } from "./Chat"
import "./PageContent.css"

export class PageContent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: [],
      verified_token: false,
    };
  }
  componentDidMount() {
    if (localStorage['TOKEN']) {
      this.verify_token()
    }
  }

  update_list() {
      request('GET', process.env.REACT_APP_API_ROOT + "/user/fetch_data").then((json) => {
      if (json.status_code != 200) {
        return;
      } else {
        this.setState({
          data: json.data,
        })
      }
    })
  }
  send_message = (message)=>{
    console.log(message);
    this.state.data.push({ role: 'user', content: message });
    this.setState({
      data: this.state.data,
    })
  }
  set_token = (token) => {
    console.log(`${token} is set as token!`);
    localStorage['TOKEN'] = token || '';
    this.verify_token();
  }
  verify_token = () => {
    request('POST', process.env.REACT_APP_API_ROOT + "/user/verify_token")
      .then((json) => {
      if (json.status_code != 200) {
        alert('Invalid TOKEN, please login!');
        localStorage.removeItem('TOKEN');
        return;
      }
      this.setState({
        verified_token: true,
      });
      this.update_list();
    });
  }
  render() {
    return (
      <>
        {!this.state.verified_token && (
          <LoginControl
            token_callback={this.set_token}
          />
        )}
        {this.state.verified_token && (
          <div className="page-content">
            <Chat
              data={this.state.data}
            />
            <Search
              send={this.send_message}
            />
          </div>
        )}
      </>
    )
  }
}