import React from "react";

class ProfileBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEmp: ""
    };
  }

  componentDidMount() {
    this.setState({
      currentEmp: {
        login_id: sessionStorage.getItem("login_id"),
        login_name: sessionStorage.getItem("login_name"),
        login_rank: sessionStorage.getItem("login_rank"),
        login_avatar: sessionStorage.getItem("login_avatar")
      }
    });
  }

  render() {
    return (
      <div className="profile">
        <img src={this.state.currentEmp.login_avatar} alt="profile" />
        <div>{this.state.currentEmp.login_id}</div>
        <div>{this.state.currentEmp.login_name}</div>
        <div>{this.state.currentEmp.login_rank}</div>
      </div>
    );
  }

  _callProfile = async () => {
    const response = await fetch("/api/profileInfo");
    const body = await response.json();

    return body;
  };
}

export default ProfileBox;
