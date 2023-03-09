import React from "react";
import { LoginControl } from './login'
import { Search } from "./Search";
import { get_json } from "./utils/functions";
import { Chat } from "./Chat"
import "./PageContent.css"

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
      this.verify_token();
    }
  }
  fetch_record = (token)=>{
    fetch(process.env.REACT_APP_API_ROOT + "/user/verify_token").then(get_json).then((json) => {
      if (json.code != 200) {
        alert('Invalid TOKEN, please login!');
        localStorage.removeItem('TOKEN');
        return;
      }
      this.setState({
        verified_token: true
      });
      this.update_list();
    });
  }

  update_list() {
    fetch(process.env.REACT_APP_API_ROOT + "/user/fetch_data").then(get_json).then((json) => {
      if (json.code != 200) {
        return;
      } else {
        this.setState({
          data: json.data,
        });
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
    this.setState({
      token: token,
    });
    this.verify_token();
  }
  verify_token = () => {
    this.setState({
      verified_token: true,
    })
    this.fetch_record(this.state.token);
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