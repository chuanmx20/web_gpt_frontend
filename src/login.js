import React from "react";
import Popup from 'reactjs-popup';
import './login.css'
import { get_json } from "./functions";

const authorize_uri = 'https://github.com/login/oauth/authorize';
const client_id = '325f0a66ca7279f6f2d1'
export class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code')
    
    /// recall of oauth!
    if (code != undefined) {
      if (this.oauth_login(this.props.token_callback)) {
        this.state = {
          isLoggedIn: true,
          code: code
        };
      }
    } else {
      this.state = {
        isLoggedIn: false,
        code: undefined,
      };
    }
  }
  click_login() {
    window.location.href = `${authorize_uri}?client_id=${client_id}`;
  }
  oauth_login(set_token) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const body = new URLSearchParams();
    Object.entries({
      code
    }).forEach((param) => body.append(...param));
    fetch(process.env.REACT_APP_API_ROOT + '/login', {
      methos: 'POST',
      body,
    }).then(get_json)
      .then((json) => {
        if (json.code != 200) {
          throw new Error(JSON.stringify(json));
        }

        set_token(json.token);
        alert('Successfully logged in!');
      });

    let token = 'token'
    return true;
  }
  remove_url_params() {
    var newURL = location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);
  }
  render() {
    return (
      <div>
        {!(this.state.isLoggedIn) && (
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
                    <img className='github-icon' src={require("./github-mark.png")} /> 
                    <span className='github-button-text'>
                      GitHub OAuth Login
                    </span>
                  </button>
                </div>
              </div>
            )}
          </Popup >
        )}
      </div>
      
      
    )
    
  }
}
