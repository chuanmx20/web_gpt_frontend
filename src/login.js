import React from "react";
import Popup from 'reactjs-popup';
import './login.css'
import { get_json } from "./utils/functions";

const authorize_uri = process.env.REACT_APP_AUTHORIZE_URI;
const client_id = process.env.REACT_APP_CLIENT_ID;
export class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
          isLoggedIn: false,
          code: undefined
    };
  }
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code')
    /// recall of oauth!
    if (code != undefined) {
      this.oauth_login(this.props.token_callback);
    }
  }
  click_login() {
    window.location.href = `${authorize_uri}?client_id=${client_id}`;
  }
  oauth_login = (set_token) => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    
    fetch(process.env.REACT_APP_API_ROOT + '/user/login', {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: {
      code: code,
    }, // body data type must match "Content-Type" header
  }).then(get_json)
      .then((json) => {
        if (json.code != 200) {
          throw new Error(JSON.stringify(json));
        }
        set_token(json.token)
        alert('Successfully logged in!');
      });
    this.remove_url_params();
    this.setState({
      isLoggedIn: true,
      code: code,
    })
  }
  remove_url_params() {
    var newURL = location.href.split("?")[0];
    window.history.pushState('object', document.title, newURL);
  }
  render() {
    return (
      <div className="popup">
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
                    <img className='github-icon' src={require("./imgs/github-mark.png")} /> 
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
