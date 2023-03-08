import React from "react";
import Popup from 'reactjs-popup';
import './login.css'
import './github-mark.png'

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
  oauth_login(token_callback) {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code')
    let token = ''
    token_callback(token)
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
        {this.state.isLoggedIn && (
          <p>
            Logged In
          </p>
        )}
      </div>
      
      
    )
    
  }
}
