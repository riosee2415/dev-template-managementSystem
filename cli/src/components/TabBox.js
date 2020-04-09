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
                  className={
                    this.props.selectedTab == idx + 1
                      ? "tab__item active"
                      : "tab__item"
                  }
                  onClick={() => this.props.tabClickHandler(idx + 1)}
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
}

export default TabBox;
