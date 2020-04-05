import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";

class MM0103 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0103",
      selectCollection: ["employee"],
      empInfo: null
    };
  }

  render() {
    const { pageCode, selectCollection } = this.state;

    return (
      <>
        <div className="mm">
          <div className="mm__header mh">
            <div className="mh__content">
              <div className="mh__content__title">
                <IconComponent iconName="fas fa-leaf" />
                <span>인사 관리 > 출퇴근 관리</span>
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
                  dataClickHandler={this._dataClickHandler}
                />
              </div>
            </div>
            <div className="mc__col2">
              <div className="mc__col2__title">
                <IconComponent iconName="fas fa-play" />
                <span className="subTitle">직원 정보</span>
              </div>
              <div className="mc__col2__desc">
                {this.state.empInfo ? (
                  <div className="mm0103__dataBox">
                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>프로필</span>
                      </div>
                      <div className="dataBox__col">
                        <span>
                          <img
                            src={this.state.empInfo.avatar}
                            className="profile__img"
                            alt="profile"
                          />
                        </span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>아이디</span>
                      </div>
                      <div className="dataBox__col">
                        <span>{this.state.empInfo.empId}</span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>직원명</span>
                      </div>
                      <div className="dataBox__col">
                        <span>{this.state.empInfo.name}</span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>직급</span>
                      </div>
                      <div className="dataBox__col">
                        <span>{this.state.empInfo.rank}</span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>근무위치</span>
                      </div>
                      <div className="dataBox__col">
                        <span>{this.state.empInfo.loc}</span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>고용일</span>
                      </div>
                      <div className="dataBox__col">
                        <span>{this.state.empInfo.hire}</span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>생년월일</span>
                      </div>
                      <div className="dataBox__col">
                        <span>{this.state.empInfo.birthday}</span>
                      </div>
                    </div>

                    <div className="dataBox__row">
                      <div className="dataBox__col">
                        <span>주소</span>
                      </div>
                      <div className="dataBox__col">
                        <span>
                          {this.state.empInfo.zoneCode
                            ? `(${this.state.empInfo.zoneCode}) `
                            : null}
                          {this.state.empInfo.addr1} {this.state.empInfo.addr2}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  _dataClickHandler = async key => {
    const response = await fetch("/api/getEmpInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key })
    });

    const data = await response.json();

    this.setState({
      empInfo: data
    });
  };
}

export default MM0103;
