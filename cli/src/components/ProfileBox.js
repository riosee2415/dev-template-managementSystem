import React from "react";

class ProfileBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentEmp: ""
    };
  }

  componentDidMount() {
    this._callProfile().then(res => {
      this.setState({
        currentEmp: res
      });
    });
  }

  render() {
    return (
      <div className="profile">
        <img src={this.state.currentEmp.image} alt="profile" />
        <div>{this.state.currentEmp.id}</div>
        <div>{this.state.currentEmp.name}</div>
        <div>{this.state.currentEmp.rank}</div>
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
