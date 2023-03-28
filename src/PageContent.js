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
            } else {
              this.setState({
                verified_token: false,
              })
            }
            
          }
        )
    }
  }

  async get_list() {
    console.log('called')
    var json = await request('GET', process.env.REACT_APP_API_ROOT + "/user/fetch_data")
    if (json.status_code != 200) {
      alert(`error: ${json.data}`)
      return [];
    } else {
      console.log(json.data)
      return json.data;
    }
  }
  clear = () => {
    console.log('Try to clear messages');
    this.setState({
      loading: true,
    });
    request('POST', process.env.REACT_APP_API_ROOT + '/user/clear').then((json) => {
      if (json.status_code == 200) {
        this.setState({
          data: [],
          loading: false,
        });
        console.log("Cleared");
      } else {
        this.setState({
          loading: false,
        });
        console.log(`Failed to Clear: ${json.data}`);
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
    request('POST', process.env.REACT_APP_API_ROOT + '/user/ask', {
      'content': message,
    })
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
    var json = await request('POST', process.env.REACT_APP_API_ROOT + "/user/verify_token")
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
              clear={this.clear}
              send={this.send_message}
              loading={this.state.loading}
            />
          </div>
        )}
      </>
    )
  }
}