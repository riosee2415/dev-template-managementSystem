import React from "react";

class LeftListBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: this.props.pageCode,
      collection: this.props.collection,
      dataList: []
    };
  }

  componentDidMount = async () => {
    const response = await this._callCollectionInfo();

    this.setState({
      dataList: response
    });
  };

  render() {
    const { dataList } = this.state;

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
            <tbody className="lb__table-data txt-darkGray" id="lb-data-js">
              {dataList.map((data, idx) => {
                return (
                  <tr>
                    <td>{idx + 1}</td>
                    <td>{data.name}</td>
                    <td>{data.rank}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </>
    );
  }

  _callCollectionInfo = async () => {
    const { pageCode, collection } = this.state;

    const response = await fetch("/api/callCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ pageCode, collection })
    });

    return await response.json();
  };
}

export default LeftListBox;
