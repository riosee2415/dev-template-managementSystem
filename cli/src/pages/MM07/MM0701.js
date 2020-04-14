import React from "react";
import LeftListBox from "../../components/LeftListBox";
import Tooltip from "@material-ui/core/Tooltip";
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
                <div className="client__body">
                  <Tooltip title="대표자명" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-signature" />
                      </span>
                      <span>{clientInfo.chiefName}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="상호명" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-lightbulb" />
                      </span>
                      <span>{clientInfo.name}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="사업자유형" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-address-book" />
                      </span>
                      <span>{clientInfo.BP}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="사업자번호" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-paperclip" />
                      </span>
                      <span>{clientInfo.businessNumber}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="주소" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-map-pin" />
                      </span>
                      <span>{clientInfo.address}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="업태" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="far fa-building" />
                      </span>
                      <span>{clientInfo.business}</span>
                    </div>
                  </Tooltip>

                  <Tooltip title="등록일" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-calendar-plus" />
                      </span>
                      <span>{clientInfo.insDate}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="담당자" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-user" />
                      </span>
                      <span>{clientInfo.manager}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="전화번호" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-phone-volume" />
                      </span>
                      <span>{clientInfo.tel}</span>
                    </div>
                  </Tooltip>

                  <Tooltip title="담당자연락처" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-mobile-alt" />
                      </span>
                      <span>{clientInfo.managerTel}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="담당자이메일" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-envelope" />
                      </span>
                      <span>{clientInfo.managerEmail}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="상태" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-pen-fancy" />
                      </span>
                      <span>
                        {clientInfo.status === "1" ? "정상사업자" : "폐업"}
                      </span>
                    </div>
                  </Tooltip>
                  <Tooltip title="과세유형" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-asterisk" />
                      </span>
                      <span>{clientInfo.taxation}</span>
                    </div>
                  </Tooltip>
                  <Tooltip title="종목" placement="left">
                    <div>
                      <span>
                        <IconComponent iconName="fas fa-user-tie" />
                      </span>
                      <span>{clientInfo.type}</span>
                    </div>
                  </Tooltip>
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
