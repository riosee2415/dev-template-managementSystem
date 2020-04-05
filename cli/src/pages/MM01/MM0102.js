import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";

class MM0102 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0102",
      selectCollection: ["employee", "annualHoliday"],
      annualInfo: []
    };
  }

  render() {
    const { pageCode, selectCollection, annualInfo } = this.state;

    return (
      <>
        <div className="mm">
          <div className="mm__header mh">
            <div className="mh__content">
              <div className="mh__content__title">
                <IconComponent iconName="fas fa-leaf" />
                <span>인사 관리 > 연차 관리</span>
              </div>
            </div>
          </div>
          <div className="mm__content mc">
            <div className="mc__col1">
              <div className="mc__col1__title">
                <IconComponent iconName="fas fa-list-ul" />
                <span className="subTitle">직원 목록</span>
              </div>
              <div className="mc__col1__desc">
                <LeftListBox
                  title_01="번호"
                  title_02="직원명"
                  title_03="직급"
                  pageCode={pageCode}
                  collections={selectCollection}
                  dataClickHandler={this._annualClickHandler}
                />
              </div>
            </div>
            <div className="mc__col2">
              <div className="mc__col2__title">
                <IconComponent iconName="fas fa-play" />
                <span className="subTitle">연차 정보</span>
              </div>
              <div className="mc__col2__desc">
                {annualInfo.map(data => {
                  return (
                    <>
                      <div>{data.year}</div>
                      <div>{data.allAnnual}</div>
                      <div>{data.usedAnnual}</div>
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  _annualClickHandler = async key => {
    const response = await fetch("/api/getAnnualInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key })
    });
    const data = await response.json();
    console.log(data);
    this.setState({
      annualInfo: data
    });
  };
}

export default MM0102;
