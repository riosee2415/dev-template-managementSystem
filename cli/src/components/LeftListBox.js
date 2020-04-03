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
    const { pageCode, dataList } = this.state;

    return (
      <>
        <div className="left-list__box lb">
          <div className="lb__head__box">
            <table className="lb__table">
              <colgroup>
                <col width="60px" />
                <col width="*" />
                <col width="100px" />
              </colgroup>
              <thead>
                <tr>
                  <th>{this.props.title_01}</th>
                  <th>{this.props.title_02}</th>
                  <th>{this.props.title_03}</th>
                </tr>
              </thead>
            </table>
          </div>
          <div className="lb__body__box scrollbar scroll-vertical">
            <table className="lb__table">
              <colgroup>
                <col width="60px" />
                <col width="*" />
                <col width="100px" />
              </colgroup>
              <tbody className="txt-darkGray">
                {dataList.map((data, idx) => {
                  if (pageCode === "MM0103") {
                    return (
                      <tr
                        key={data.docId}
                        onClick={() => this.props.dataClickHandler(data.empId)}
                      >
                        <td>{idx + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.rank}</td>
                      </tr>
                    );
                  } else if (pageCode === "MM0102") {
                    return (
                      <tr
                        key={data.docId}
                        onClick={() => this.props.dataClickHandler(data.docId)}
                      >
                        <td>{idx + 1}</td>
                        <td>{data.name}</td>
                        <td>{data.rank}</td>
                      </tr>
                    );
                  } else {
                    return (
                      <tr>
                        <td colspan="3">데이터가 없습니다.</td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
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
