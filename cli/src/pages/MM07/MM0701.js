import React from "react";
import LeftListBox from "../../components/LeftListBox";
import IconComponent from "../../components/material/IconComponent";

class MM0701 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0701",
      selectCollection: ["client"],
      isLeftRefresh: false,
      clientInfo: null,
    };
  }

  render() {
    const {
      pageCode,
      selectCollection,
      isLeftRefresh,
      clientInfo,
    } = this.state;

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>클라이언트 관리 > 클라이언트 리스트</span>
            </div>
            <div className="mh__content__btn">
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-blue"
                  value="추가"
                />
              </span>
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-blue"
                  value="수정"
                />
              </span>
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-pink"
                  value="삭제"
                />
              </span>
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-blue"
                  value="작성"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="mm__content mc">
          <div className="mc__col1">
            <div className="mc__col1__title">
              <IconComponent iconName="fas fa-list-ul" />
              <span className="subTitle">클라이언트 리스트</span>
            </div>
            <div className="mc__col1__desc">
              <LeftListBox
                title_01="번호"
                title_02="거래처명"
                title_03="대표자명"
                pageCode={pageCode}
                collections={selectCollection}
                dataClickHandler={this._dataClickHandler}
                isRefresh={isLeftRefresh}
              />
            </div>
          </div>
          <div className="mc__col2">
            <div className="mc__col2__title">
              <IconComponent iconName="fas fa-info-circle" />
              <span className="subTitle">상세정보</span>
            </div>
            <div className="mc__col2__desc">
              {clientInfo ? (
                <div>
                  <div>{clientInfo.BP}</div>
                  <div>{clientInfo.address}</div>
                  <div>{clientInfo.business}</div>
                  <div>{clientInfo.businessNumber}</div>
                  <div>{clientInfo.chiefName}</div>
                  <div>{clientInfo.insDate}</div>
                  <div>{clientInfo.name}</div>
                  <div>{clientInfo.status === "1" ? "정상사업자" : "폐업"}</div>
                  <div>{clientInfo.taxation}</div>
                  <div>{clientInfo.type}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }

  _dataClickHandler = async (key) => {
    const response = await fetch("/api/getClientDetail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key }),
    });
    const data = await response.json();
    this.setState({
      clientInfo: data,
    });
  };
}

export default MM0701;
