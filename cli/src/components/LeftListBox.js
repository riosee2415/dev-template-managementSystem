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
              <tr>
                <th>{this.props.title_01}</th>
                <th>{this.props.title_02}</th>
                <th>{this.props.title_03}</th>
              </tr>
            </thead>
            <tbody
              className="lb__table-data txt-darkGray"
              id="lb-data-js"
            ></tbody>
          </table>
        </div>
      </>
    );
  }
}

export default LeftListBox;
