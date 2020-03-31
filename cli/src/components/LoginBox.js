import React from "react";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="login-box">
          <form action="" method="post">
            <input type="text" />
            <input type="text" />

            <button id="loginBtn-js" onClick={this.props.action}>
              Login
            </button>
          </form>
        </div>
      </>
    );
  }
}

export default LoginBox;
