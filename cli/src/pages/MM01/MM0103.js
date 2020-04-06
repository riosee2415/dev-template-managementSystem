import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import FormDialog from "../../components/FormDialog";
import { TextField } from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";

class MM0103 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0103",
      selectCollection: ["employee"],
      empInfo: null,
      isLeftRefresh: false,
      isRegistFormOpen: false
    };
  }

  render() {
    const { pageCode, selectCollection, isLeftRefresh } = this.state;

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>인사 관리 > 직원 정보</span>
            </div>

            <div className="mh__content__btn">
              <span>
                <button
                  type="button"
                  className="btn btn-xs bg-blue"
                  onClick={this._empRegistHandler}
                >
                  추가
                </button>
              </span>
              <span>
                <button type="button" className="btn btn-xs bg-orange">
                  수정
                </button>
              </span>
              <span>
                <button
                  type="button"
                  className="btn btn-xs bg-pink"
                  onClick={this._empRemoveHandler}
                >
                  삭제
                </button>
              </span>
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
                isRefresh={isLeftRefresh}
              />
            </div>
          </div>
          <div className="mc__col2">
            <div className="mc__col2__title">
              <IconComponent iconName="fas fa-info-circle" />
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

        <FormDialog
          open={this.state.isRegistFormOpen}
          title="직원 등록"
          content="등록할 직원정보를 입력해주세요."
          submitDialogHandler={this._empRegistSubmitDialogHandler}
          closeDialogHandler={this._empRegistCloseDialogHandler}
        >
          <TextField
            autoFocus
            margin="dense"
            label="아이디"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="직원명"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="생년월일"
            type="text"
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            label="생년월일"
            type="text"
            fullWidth
          />
        </FormDialog>
      </div>
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

  _empRegistHandler = async () => {
    this.setState({
      isRegistFormOpen: true
    });
  };

  _empRegistSubmitDialogHandler = () => {
    this.setState({
      isRegistFormOpen: false
    });
    console.log("submit!!");
  };

  _empRegistCloseDialogHandler = () => {
    this.setState({
      isRegistFormOpen: false
    });
    console.log("close!!");
  };

  _empRemoveHandler = async () => {
    const { empInfo, isLeftRefresh } = this.state;

    if (!empInfo) {
      alert("삭제할 직원을 선택해주세요.");
      return;
    }

    const response = await fetch("/api/removeEmpInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ empInfo })
    });

    const data = await response.json();

    if (data.result) {
      alert("삭제 처리되었습니다.");

      this.setState({
        empInfo: null,
        isLeftRefresh: !isLeftRefresh
      });
    } else {
      alert("데이터 처리 중 문제가 발생했습니다.");
    }
  };
}

export default MM0103;
