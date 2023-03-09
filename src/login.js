import React from "react";
import Popup from 'reactjs-popup';
import './login.css'
import { request } from "./utils/functions";

const authorize_uri = process.env.REACT_APP_AUTHORIZE_URI;
const client_id = process.env.REACT_APP_CLIENT_ID;
export class LoginControl extends React.Component {
  constructor(props) {
    console.log('created login control')
    super(props);
  
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code')
    /// recall of oauth!
    if (code != undefined) {
      this.oauth_login(this.props.code_callback);
    }
  }
  click_login() {
    window.location.href = `${authorize_uri}?client_id=${client_id}`;
  }
  oauth_login = (set_token) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    request("POST", process.env.REACT_APP_API_ROOT + '/user/login', { 'code': code }).then((json) => {
      console.log(json)
      if (json.status_code != 200) {
        throw new Error(JSON.stringify(json));
      }
      this.remove_url_params();
      set_token(json.token)
      alert('Successfully logged in!');
    })

  }
  remove_url_params() {
    var newURL = location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);
  }
  render() {
    return (
      <div className="popup">
          <Popup Popup
            trigger={
              <button>
                Login
              </button>
            }
            modal
            nested
          >
            {close => (
              <div className="modal">
                <button className="close" onClick={close}>
                  &times;
                </button>
                <div className='header'>
                  Please Login
                </div>
                <div className="content">
                  <button onClick={this.click_login.bind(this)} className='github-button'>
                    <img className='github-icon' src={require("./imgs/github-mark.png")} /> 
                    <span className='github-button-text'>
                      GitHub OAuth Login
                    </span>
                  </button>
                </div>
              </div>
            )}
          </Popup >
      </div>
    )
    
  }
}
