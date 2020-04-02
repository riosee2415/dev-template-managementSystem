import React from "react";

class LeftListBox extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <>
        <div className="left-list__box lb">
          <table className="lb__table">
            <thead>
              <th>{this.props.title_01}</th>
              <th>{this.props.title_02}</th>
              <th>{this.props.title_03}</th>
            </thead>
            <tbody id="lb-data-js"></tbody>
          </table>
        </div>
      </>
    );
  }
}

export default LeftListBox;
