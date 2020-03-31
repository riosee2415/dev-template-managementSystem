import React from "react";

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <form action="" method="post">
          <input type="text" />
          <input type="text" />

          <button onClick={this.props.action}>Login</button>
        </form>
      </>
    );
  }
}

export default LoginBox;
