import React from "react";
import IconComponent from "./IconComponent";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="login-box">
          <div className="login-img-box">
            <IconComponent iconName="fas fa-user-circle" />
          </div>
          <form id="loginFrm-js" action="/api/loginProcess" method="post">
            <h3>
              <p>
                <span>4</span>LEAF
              </p>
              MANAGEMENT SYSTEM
            </h3>
            <div className="id">
              <input type="text" placeholder="ID" />
            </div>
            <div className="pass">
              <input type="password" placeholder="PASSWORD" />
            </div>

            <div className="login-btn">
              <button
                type="button"
                id="loginBtn-js"
                onClick={this.props.action}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default LoginBox;
