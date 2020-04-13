import React from "react";

class LeftListBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: this.props.pageCode,
      collections: this.props.collections,
      dataList: [],
      isEmptyData: false,
    };
  }

  componentDidMount = async () => {
    const response = await this._callCollectionInfo();

    this.setState({
      dataList: response,
      isEmptyData: response.length > 0 ? false : true,
    });
  };

  componentDidUpdate = async (prevProps, prevState) => {
    if (prevProps.isRefresh !== this.props.isRefresh) {
      const response = await this._callCollectionInfo();

      this.setState({
        dataList: response,
        isEmptyData: response.length > 0 ? false : true,
      });
    }
  };

  render() {
    const { pageCode, dataList, isEmptyData } = this.state;

    return (
      <>
        <div className="left-list__box lb">
          <div className="lb__head__box">
            <table className="lb__table">
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
              <tbody className="txt-darkGray">
                {!isEmptyData ? (
                  dataList.map((data, idx) => {
                    if (pageCode === "MM0102") {
                      return (
                        <tr
                          key={data.docId}
                          onClick={() =>
                            this.props.dataClickHandler(data.docId)
                          }
                        >
                          <td>{idx + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.position}</td>
                        </tr>
                      );
                    } else if (pageCode === "MM0103") {
                      return (
                        <tr
                          key={data.docId}
                          onClick={() =>
                            this.props.dataClickHandler(data.docId)
                          }
                        >
                          <td>{idx + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.position}</td>
                        </tr>
                      );
                    } else if (pageCode === "MM0202") {
                      return (
                        <tr
                          key={data.docId}
                          onClick={() =>
                            this.props.dataClickHandler(data.docId)
                          }
                        >
                          <td>{idx + 1}</td>
                          <td>{data.projectName}</td>
                          <td>{data.projectType}</td>
                        </tr>
                      );
                    } else if (pageCode === "MM0701") {
                      return (
                        <tr
                          key={data.docId}
                          onClick={() =>
                            this.props.dataClickHandler(data.docId)
                          }
                        >
                          <td>{idx + 1}</td>
                          <td>{data.cliName}</td>
                          <td>{data.cliChief}</td>
                        </tr>
                      );
                    } else {
                      return (
                        <tr className="empty">
                          <td colSpan="3">데이터가 없습니다.</td>
                        </tr>
                      );
                    }
                  })
                ) : (
                  <tr className="empty">
                    <td colSpan="3">데이터가 없습니다.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </>
    );
  }

  _callCollectionInfo = async () => {
    const { pageCode, collections } = this.state;

    const response = await fetch("/api/callCollection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ pageCode, collections }),
    });

    return await response.json();
  };
}

export default LeftListBox;
