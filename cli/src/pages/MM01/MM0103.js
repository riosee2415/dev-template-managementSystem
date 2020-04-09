import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import TabBox from "../../components/TabBox";
import FormDialog from "../../components/FormDialog";
import AlertDialog from "../../components/AlertDialog";
import ConfirmDialog from "../../components/ConfirmDialog";
import { TextField } from "@material-ui/core";

class MM0103 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0103",
      selectCollection: ["employee"],
      empInfo: null,
      isLeftRefresh: false,
      isEmpRegistFormOpen: false,
      isAlertOpen: false,
      alertType: null,
      alertTitle: null,
      alertContent: null,
      isConfirmOpen: false,
      confirmTitle: null,
      confirmContent: null,
      selectedTab: 1,
    };
  }

  render() {
    const {
      pageCode,
      selectCollection,
      isLeftRefresh,
      isEmpRegistFormOpen,
      isAlertOpen,
      alertType,
      alertTitle,
      alertContent,
      isConfirmOpen,
      confirmTitle,
      confirmContent,
      selectedTab,
    } = this.state;

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
              <IconComponent iconName="fas fa-file-alt" />
              <span className="subTitle">상세정보</span>
            </div>
            <div className="mc__col2__desc">
              {this.state.empInfo ? (
                <>
                  <TabBox
                    tabs={["기본정보", "정보"]}
                    selectedTab={selectedTab}
                  />

                  <div className="mm0103__dataBox tab-content">
                    <div className="dataBox__header">
                      <div className="data__profile">
                        <img
                          src={this.state.empInfo.avatar}
                          className="profile__img"
                          alt="profile"
                        />
                      </div>
                      <div className="data__info">
                        <span>{this.state.empInfo.name}</span>
                        <span>{this.state.empInfo.rank}</span>
                      </div>
                    </div>

                    <div className="dataBox__body">
                      <div className="dataBox__col">
                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-id-card-alt" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.empId}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-phone-volume" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.mobile}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-at" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.email}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-birthday-cake" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.birthday}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-home" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.zoneCode
                              ? `(${this.state.empInfo.zoneCode}) `
                              : null}
                            &nbsp;
                            {this.state.empInfo.addr1}
                            <br />
                            {this.state.empInfo.addr2}
                          </span>
                        </div>
                      </div>

                      <div className="dataBox__col">
                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-map-marker-alt" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.loc}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-id-badge" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.empNo}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-users" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.dept}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-user-tie" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.position}
                          </span>
                        </div>

                        <div className="dataBox__row">
                          <span className="data__icon">
                            <IconComponent iconName="fas fa-calendar-alt" />
                          </span>
                          <span className="data__info">
                            {this.state.empInfo.hire}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mm0103__dataBox__02 tab-content">정보2</div>
                </>
              ) : null}
            </div>
          </div>
        </div>

        {isAlertOpen ? (
          <AlertDialog
            isOpen={isAlertOpen}
            type={alertType}
            title={alertTitle}
            content={alertContent}
            closeDialogHandler={() => this.setState({ isAlertOpen: false })}
          />
        ) : null}

        {isConfirmOpen ? (
          <ConfirmDialog
            isOpen={isConfirmOpen}
            title={confirmTitle}
            content={confirmContent}
            submitDialogHandler={this._empRemoveConfirmSubmitDialogHandler}
            closeDialogHandler={() => this.setState({ isConfirmOpen: false })}
          />
        ) : null}

        {isEmpRegistFormOpen ? (
          <FormDialog
            isOpen={isEmpRegistFormOpen}
            title="직원 등록"
            content="등록할 직원정보를 입력해주세요."
            submitDialogHandler={this._empRegistFormSubmitDialogHandler}
            closeDialogHandler={this._empRegistFormCloseDialogHandler}
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
        ) : null}
      </div>
    );
  }

  _dataClickHandler = async (key) => {
    const response = await fetch("/api/getEmpInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();

    this.setState({
      empInfo: data,
    });
  };

  _empRegistHandler = async () => {
    this.setState({
      isEmpRegistFormOpen: true,
    });
  };

  _empRegistFormSubmitDialogHandler = () => {
    this.setState({
      isEmpRegistFormOpen: false,
    });
  };

  _empRegistFormCloseDialogHandler = () => {
    this.setState({
      isEmpRegistFormOpen: false,
    });
  };

  _empRemoveHandler = () => {
    const { empInfo } = this.state;

    if (!empInfo) {
      this.setState({
        isAlertOpen: true,
        alertType: "info",
        alertTitle: "알림",
        alertContent: "삭제할 직원을 선택해주세요.",
      });
      return;
    }
    this.setState({
      isConfirmOpen: true,
      confirmTitle: "확인",
      confirmContent: "[" + empInfo.name + "] 님을 삭제하시겠습니까 ?",
    });
  };

  _empRemoveConfirmSubmitDialogHandler = async () => {
    const { empInfo, isLeftRefresh } = this.state;

    this.setState({
      isConfirmOpen: false,
    });

    const response = await fetch("/api/removeEmpInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ empInfo }),
    });

    const data = await response.json();

    if (data.result) {
      this.setState({
        isAlertOpen: true,
        alertType: "success",
        alertTitle: "알림",
        alertContent: "삭제 처리되었습니다.",
      });

      this.setState({
        empInfo: null,
        isLeftRefresh: !isLeftRefresh,
      });
    } else {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "데이터 처리 중 문제가 발생했습니다.",
      });
    }
  };
}

export default MM0103;
