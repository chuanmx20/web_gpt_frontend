import React from "react";
import Popup from 'reactjs-popup';
import ReactDOM from 'react-dom';

export class LoginControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  click_login() {
    this.setState({
        isLoggedIn: true
      }
    )

  }
  render() {
    return (
      <div>
        {!(this.state.isLoggedIn) && (
          <Popup Popup
            trigger={
              <button>
                Trigger
              </button>
            }
            position="right center" >
            <div className="login-popup">
              <div className='header'>
                Please Login
              </div>
              <div className="content">
                <button onClick={this.click_login.bind(this)}>
                  GitHub OAuth Login
                </button>
              </div>
            </div>
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
