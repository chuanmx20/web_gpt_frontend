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
      loading: false,
    }
  }
  UNSAFE_componentWillMount() {
    if (localStorage.TOKEN) {
      this.verify_token()
        .then(
          (authed) => {
            if (authed) {
              this.setState({
                verified_token: true,
              });
              this.get_list()
                .then(
                  (data) => {
                    this.setState({
                      data: Array.isArray(data) ? data : [],
                    })
                  }
                )
            }
            
          }
        )
    }
  }

  async get_list() {
      request('GET', process.env.REACT_APP_API_ROOT + "/user/fetch_data").then((json) => {
      if (json.status_code != 200) {
        console.log(json.data);
        throw new Error(json.data);
        return [];
      } else {
        return json.data;
      }
    })
  }
  send_message = (message)=>{
    console.log(message);
    this.state.data.push({ role: 'user', content: message });
    this.setState({
      data: this.state.data,
      loading: true,
    });
    request('POST', process.env.REACT_APP_API_ROOT + '/user/ask')
      .then(
        (json) => {
          if (json.status_code == 200) {
            this.state.data.push(json.data);
            this.setState({
              data: this.state.data,
              loading: false,
            })
          } else {
            alert(json.data);
            this.setState({
              loading: false,
            })
          }
        }
      );
  }
  set_token = (token) => {
    console.log(`${token} is set as token!`);
    localStorage['TOKEN'] = token || '';
    this.setState({
      verified_token: true,
    });
    this.get_list()
      .then(
        (data) =>
        {
          this.setState({
            data: Array.isArray(data) ? data : [],
          })
        }
      )
  }
  async verify_token() {
    console.log('called')
    var json = await request('POST', process.env.REACT_APP_API_ROOT + "/user/verify_token")
    console.log(json)
    if (json.status_code == 401 || json.status_code == 403) {
      alert('Invalid TOKEN, please login!');
      localStorage.removeItem('TOKEN');
      return false;
    }
      return true;
  }
  render() {
    return (
      <>
        {!this.state.verified_token && (
          <LoginControl
            code_callback={this.set_token}
          />
        )}
        {this.state.verified_token && (
          <div className="page-content">
            <Chat
              data={this.state.data}
            />
            <Search
              send={this.send_message}
              loading={this.state.loading}
            />
          </div>
        )}
      </>
    )
  }
}