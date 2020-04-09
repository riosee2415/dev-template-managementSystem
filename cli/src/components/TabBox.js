import React from "react";

class TabBox extends React.Component {
  render() {
    return (
      <>
        {this.props.tabs ? (
          <div className="tab__box">
            {this.props.tabs.map((tab, idx) => {
              return (
                <div
                  key={idx}
                  className="tab__item"
                  onClick={() => this._tabClickHandler(idx + 1)}
                >
                  {tab}
                </div>
              );
            })}
          </div>
        ) : null}
      </>
    );
  }

  _tabClickHandler = number => {
    console.log(number);
  };
}

export default TabBox;
