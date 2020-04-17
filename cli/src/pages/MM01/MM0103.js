import React from "react";
import axios from "axios";
import middleware from "../../middleware/common";
import IconComponent from "../../components/material/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import TabBox from "../../components/TabBox";
import FormDialog from "../../components/material/FormDialog";
import AlertDialog from "../../components/material/AlertDialog";
import ConfirmDialog from "../../components/material/ConfirmDialog";
import ComboBox from "../../components/material/ComboBox";
import DatePickers from "../../components/material/DatePickers";
import OutlinedButton from "../../components/material/OutlinedButton";
import Postcode from "../../components/Postcode";
import TextField from "../../components/material/TextField";
import Grid from "@material-ui/core/Grid";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import PhotoCamera from "@material-ui/icons/PhotoCamera";
import Avatar from "@material-ui/core/Avatar";
import ProfileSample from "../../assets/images/profileSample.png";
import PersonIcon from "@material-ui/icons/Person";

class MM0103 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0103",
      selectCollection: ["employee"],
      empInfo: null,
      isLeftRefresh: false,
      isPostcodeOpen: false,
      isEmpRegistFormOpen: false,
      isEmpModifyFormOpen: false,
      isAlertOpen: false,
      alertType: null,
      alertTitle: null,
      alertContent: null,
      isConfirmOpen: false,
      confirmTitle: null,
      confirmContent: null,
      confirmSubmitHandler: null,
      selectedTab: 0,
      empLocList: [],
      empDeptList: [],
      empPositionList: [],
      empRankList: [],
      isIdCheck: false,
    };
  }

  componentDidMount = async () => {
    const empLocList = await middleware.getCommonData("common", "loc");
    const empDeptList = await middleware.getCommonData("common", "dept");
    const empPositionList = await middleware.getCommonData(
      "common",
      "position"
    );
    const empRankList = await middleware.getCommonData("common", "rank");

    const empLocArray = [];
    for (let i = 1; i <= Object.keys(empLocList).length; i++) {
      const data = empLocList["data" + i];
      if (!data) continue;
      empLocArray.push({ title: data });
    }

    const empDeptArray = [];
    for (let i = 1; i <= Object.keys(empDeptList).length; i++) {
      const data = empDeptList["data" + i];
      if (!data) continue;
      empDeptArray.push({ title: data });
    }

    const empPositionArray = [];
    for (let i = 1; i <= Object.keys(empPositionList).length; i++) {
      const data = empPositionList["data" + i];
      if (!data) continue;
      empPositionArray.push({ title: data });
    }

    const empRankArray = [];
    for (let i = 1; i <= Object.keys(empRankList).length; i++) {
      const data = empRankList["data" + i];
      if (!data) continue;
      empRankArray.push({ title: data });
    }

    this.setState({
      empLocList: empLocArray,
      empDeptList: empDeptArray,
      empPositionList: empPositionArray,
      empRankList: empRankArray,
    });
  };

  render() {
    const {
      pageCode,
      selectCollection,
      isLeftRefresh,
      isPostcodeOpen,
      isEmpRegistFormOpen,
      isEmpModifyFormOpen,
      isAlertOpen,
      alertType,
      alertTitle,
      alertContent,
      isConfirmOpen,
      confirmTitle,
      confirmContent,
      confirmSubmitHandler,
      selectedTab,
      empInfo,
      empLocList,
      empDeptList,
      empPositionList,
      empRankList,
      isIdCheck,
    } = this.state;

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>
                인사 관리 > 직원 정보
                {this.state.empInfo ? this.state.empInfo.avatar : null}
              </span>
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
                <button
                  type="button"
                  className="btn btn-xs bg-blue"
                  onClick={this._empModifyHandler}
                >
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
              <span className="subTitle">상세 정보</span>
            </div>
            <div className="mc__col2__desc">
              {this.state.empInfo ? (
                <>
                  <TabBox
                    tabs={[
                      {
                        label: "기본정보",
                        action: this._tab01ClickHandler,
                        param1: empInfo.docId,
                      },
                      {
                        label: "추가정보",
                        action: () => {},
                      },
                    ]}
                    selectedTab={selectedTab}
                    tabChangeHandler={(value) =>
                      this.setState({ selectedTab: value })
                    }
                  />

                  {selectedTab === 1 ? (
                    <div className="mm0103__dataBox">
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
                          <Tooltip title="고용일" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-calendar-alt" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.hire}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="핸드폰" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-phone-volume" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.mobile}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="이메일" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-at" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.email}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="주소" placement="left">
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
                          </Tooltip>
                        </div>

                        <div className="dataBox__col">
                          <Tooltip title="근무위치" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-map-marker-alt" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.loc}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="사번" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-id-badge" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.empNo}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="부서" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-users" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.dept}
                              </span>
                            </div>
                          </Tooltip>

                          <Tooltip title="직급" placement="left">
                            <div className="dataBox__row">
                              <span className="data__icon">
                                <IconComponent iconName="fas fa-user-tie" />
                              </span>
                              <span className="data__info">
                                {this.state.empInfo.position}
                              </span>
                            </div>
                          </Tooltip>
                        </div>
                      </div>
                    </div>
                  ) : null}

                  {selectedTab === 2 ? (
                    <div className="mm0103__dataBox__02">
                      <div className="aa">
                        <h1>추가정보</h1>
                      </div>
                    </div>
                  ) : null}
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
            submitDialogHandler={confirmSubmitHandler}
            closeDialogHandler={() => this.setState({ isConfirmOpen: false })}
          />
        ) : null}

        {isEmpRegistFormOpen ? (
          <FormDialog
            isOpen={isEmpRegistFormOpen}
            title="직원 등록"
            submitDialogHandler={this._empRegistFormSubmitDialogHandler}
            closeDialogHandler={this._empRegistFormCloseDialogHandler}
          >
            <Grid container spacing={2}>
              <Grid
                item
                xs={12}
                container
                direction="column"
                alignItems="center"
              >
                <Tooltip title="프로필" placement="top">
                  <Avatar
                    id="profile-image-js"
                    alt="profile"
                    src={ProfileSample}
                    style={{
                      width: 150,
                      height: 150,
                      background: "#fff",
                      boxShadow: "5px 5px 20px #aeaeae",
                    }}
                  />
                </Tooltip>

                <input
                  accept="image/*"
                  id="profile-file-js"
                  name="profile_file"
                  type="file"
                  className="d-none"
                  onChange={this._profileChangeHandler}
                />
                <label htmlFor="profile-file-js">
                  <IconButton component="span" style={{ marginTop: 10 }}>
                    <Tooltip title="업로드" placement="bottom">
                      <PhotoCamera style={{ fontSize: 32, color: "#888" }} />
                    </Tooltip>
                  </IconButton>
                </label>
              </Grid>
              <Grid item xs={11}>
                <TextField
                  name="empId"
                  id="empId-js"
                  type="text"
                  label="아이디"
                  fullWidth
                  autoFocus
                  required
                  onChange={() => {
                    this.setState({
                      isIdCheck: false,
                    });
                  }}
                />
              </Grid>
              <Grid item container={true} alignItems="flex-end" xs={1}>
                <OutlinedButton
                  size="small"
                  color="primary"
                  onClick={this._empIdCheckHandler}
                >
                  확인
                </OutlinedButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="name-js"
                  label="직원명"
                  type="text"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={6}>
                <ComboBox id="loc-js" options={empLocList} label="근무위치" />
              </Grid>
              <Grid item xs={6}>
                <ComboBox id="dept-js" options={empDeptList} label="부서" />
              </Grid>
              <Grid item xs={6}>
                <ComboBox
                  id="position-js"
                  options={empPositionList}
                  label="직급"
                />
              </Grid>
              <Grid item xs={6}>
                <ComboBox id="rank-js" options={empRankList} label="직책" />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mobile-js"
                  label="핸드폰"
                  type="text"
                  fullWidth
                  required
                  helperText="- 를 포함해서 핸드폰 번호를 입력해주세요."
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email-js"
                  label="이메일"
                  type="text"
                  fullWidth
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <DatePickers id="birthday-js" label="생년월일" required />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="zoneCode-js"
                  type="text"
                  label="우편번호"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="addr1-js"
                  type="text"
                  label="주소"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </Grid>
              <Grid item container={true} alignItems="flex-end" xs={1}>
                <OutlinedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    this.setState({ isPostcodeOpen: true });
                  }}
                >
                  검색
                </OutlinedButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addr2-js"
                  label="상세주소"
                  type="text"
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormDialog>
        ) : null}

        {isEmpModifyFormOpen ? (
          <FormDialog
            isOpen={isEmpModifyFormOpen}
            title="직원정보 변경"
            submitDialogHandler={this._empModifyFormSubmitDialogHandler}
            closeDialogHandler={this._empModifyFormCloseDialogHandler}
            isModified={true}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  id="empId-js"
                  type="text"
                  label="아이디"
                  fullWidth
                  autoFocus
                  required
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={empInfo.empId}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="name-js"
                  label="직원명"
                  type="text"
                  fullWidth
                  required
                  defaultValue={empInfo.name}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboBox
                  id="loc-js"
                  options={empLocList}
                  label="근무위치"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboBox
                  id="dept-js"
                  options={empDeptList}
                  label="부서"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboBox
                  id="position-js"
                  options={empPositionList}
                  label="직급"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <ComboBox
                  id="rank-js"
                  options={empRankList}
                  label="직책"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="mobile-js"
                  label="핸드폰"
                  type="text"
                  fullWidth
                  required
                  helperText="- 를 포함해서 핸드폰 번호를 입력해주세요."
                  defaultValue={empInfo.mobile}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="email-js"
                  label="이메일"
                  type="text"
                  fullWidth
                  required
                  defaultValue={empInfo.email}
                />
              </Grid>
              <Grid item xs={12}>
                <DatePickers id="birthday-js" label="생년월일" required />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  id="zoneCode-js"
                  type="text"
                  label="우편번호"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={empInfo.zoneCode}
                />
              </Grid>
              <Grid item xs={9}>
                <TextField
                  id="addr1-js"
                  type="text"
                  label="주소"
                  fullWidth
                  required
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    readOnly: true,
                  }}
                  defaultValue={empInfo.addr1}
                />
              </Grid>
              <Grid item container={true} alignItems="flex-end" xs={1}>
                <OutlinedButton
                  size="small"
                  color="primary"
                  onClick={() => {
                    this.setState({ isPostcodeOpen: true });
                  }}
                >
                  검색
                </OutlinedButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="addr2-js"
                  label="상세주소"
                  type="text"
                  fullWidth
                  defaultValue={empInfo.addr2}
                />
              </Grid>
            </Grid>
          </FormDialog>
        ) : null}

        {isPostcodeOpen ? (
          <Postcode
            closeDialogHandler={() => {
              this.setState({ isPostcodeOpen: false });
            }}
          />
        ) : null}
      </div>
    );
  }

  _dataClickHandler = async (key) => {
    await this._tab01ClickHandler(key);
  };

  _tab01ClickHandler = async (key) => {
    const response = await fetch("/api/getEmpInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key }),
    }).then(
      this.setState({
        selectedTab: 1,
      })
    );

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

  _empIdCheckHandler = async () => {
    const empId = document.getElementById("empId-js");
    if (empId.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "아이디를 입력해주세요.",
      });
      empId.focus();
      return;
    }

    const key = empId.value;
    const response = await fetch("/api/getEmpIdCheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();

    if (data.result) {
      this.setState({
        isAlertOpen: true,
        alertType: "success",
        alertTitle: "알림",
        alertContent: "사용 가능한 아이디입니다.",
        isIdCheck: true,
      });
      empId.focus();
      return;
    } else {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "이미 사용중인 아이디입니다.",
        isIdCheck: false,
      });
      empId.focus();
      return;
    }
  };

  _empRegistFormSubmitDialogHandler = async () => {
    const empId = document.getElementById("empId-js");
    const name = document.getElementById("name-js");
    const loc = document.getElementById("loc-js");
    const dept = document.getElementById("dept-js");
    const position = document.getElementById("position-js");
    const rank = document.getElementById("rank-js");
    const birthday = document.getElementById("birthday-js");
    const mobile = document.getElementById("mobile-js");
    const email = document.getElementById("email-js");
    const addr1 = document.getElementById("addr1-js");

    const { isIdCheck } = this.state;

    let regExp = null;

    if (empId.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "아이디를 입력해주세요.",
      });
      empId.focus();
      return;
    }
    if (!isIdCheck) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "아이디 확인 체크를 해주세요.",
      });
      empId.focus();
      return;
    }
    if (name.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "직원명을 입력해주세요.",
      });
      name.focus();
      return;
    }
    if (loc.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "근무위치를 선택해주세요.",
      });
      loc.focus();
      return;
    }
    if (dept.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "부서를 선택해주세요.",
      });
      dept.focus();
      return;
    }
    if (position.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "직급을 선택해주세요.",
      });
      position.focus();
      return;
    }
    if (rank.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "직책을 선택해주세요.",
      });
      rank.focus();
      return;
    }
    if (birthday.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "생년월일을 입력해주세요.",
      });
      birthday.focus();
      return;
    }
    if (mobile.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "핸드폰 번호를 입력해주세요.",
      });
      mobile.focus();
      return;
    }
    regExp = /^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{4})$/;
    if (!regExp.test(mobile.value)) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "올바르지 않은 형식입니다.",
      });
      mobile.focus();
      return;
    }
    if (email.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "이메일을 입력해주세요.",
      });
      email.focus();
      return;
    }
    regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(email.value)) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "올바르지 않은 형식입니다.",
      });
      email.focus();
      return;
    }
    if (addr1.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "주소를 검색해주세요.",
      });
      addr1.focus();
      return;
    }

    this.setState({
      isConfirmOpen: true,
      confirmTitle: "등록",
      confirmContent: "입력하신 내용으로 직원을 등록하시겠습니까 ?",
      confirmSubmitHandler: this._empRegistConfirmSubmitDialogHandler,
    });
  };

  _empRegistConfirmSubmitDialogHandler = async () => {
    const date = new Date();
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;

    const currentDate = y + "-" + m + "-" + d;

    const empId = document.getElementById("empId-js");
    const name = document.getElementById("name-js");
    const loc = document.getElementById("loc-js");
    const dept = document.getElementById("dept-js");
    const position = document.getElementById("position-js");
    const rank = document.getElementById("rank-js");
    const birthday = document.getElementById("birthday-js");
    const mobile = document.getElementById("mobile-js");
    const email = document.getElementById("email-js");
    const addr1 = document.getElementById("addr1-js");
    const addr2 = document.getElementById("addr2-js");
    const zoneCode = document.getElementById("zoneCode-js");
    const profile_file = document.getElementById("profile-file-js");

    const data = {
      empId: empId.value,
      password: birthday.value.replace(/-/gi, "").substring(2, 8) + "a",
      empNo: "SD202000001",
      name: name.value,
      loc: loc.value,
      dept: dept.value,
      position: position.value,
      rank: rank.value,
      hire: currentDate,
      birthday: birthday.value,
      mobile: mobile.value,
      email: email.value,
      addr1: addr1.value,
      addr2: addr2.value,
      zoneCode: zoneCode.value,
      useyn: "y",
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("profile_file", profile_file.files[0]);

    const { isLeftRefresh } = this.state;

    this.setState({
      isAlertOpen: true,
      alertType: "success",
      alertTitle: "알림",
      alertContent: "등록 되었습니다.",
      isEmpRegistFormOpen: false,
      isConfirmOpen: false,
      isLeftRefresh: !isLeftRefresh,
      empInfo: null,
    });

    const response = await axios.post("/api/addEmpInfo", formData);
  };

  _empRegistFormCloseDialogHandler = () => {
    this.setState({
      isEmpRegistFormOpen: false,
    });
  };

  _empModifyHandler = async () => {
    const { empInfo } = this.state;

    if (!empInfo) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "변경할 직원을 선택해주세요.",
      });
    } else {
      await this.setState({
        isEmpModifyFormOpen: true,
      });

      const loc = document.getElementById("loc-js");
      const dept = document.getElementById("dept-js");
      const position = document.getElementById("position-js");
      const rank = document.getElementById("rank-js");
      const birthday = document.getElementById("birthday-js");

      setTimeout(() => {
        loc.value = empInfo.loc;
        dept.value = empInfo.dept;
        position.value = empInfo.position;
        rank.value = empInfo.rank;
        birthday.value = empInfo.birthday;
        console.log(empInfo.birthday);
      }, 1);
    }
  };

  _empModifyFormSubmitDialogHandler = async () => {
    const empId = document.getElementById("empId-js");
    const name = document.getElementById("name-js");
    const loc = document.getElementById("loc-js");
    const dept = document.getElementById("dept-js");
    const position = document.getElementById("position-js");
    const rank = document.getElementById("rank-js");
    const birthday = document.getElementById("birthday-js");
    const mobile = document.getElementById("mobile-js");
    const email = document.getElementById("email-js");
    const addr1 = document.getElementById("addr1-js");

    let regExp = null;

    if (empId.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "아이디를 입력해주세요.",
      });
      empId.focus();
      return;
    }
    if (name.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "직원명을 입력해주세요.",
      });
      name.focus();
      return;
    }
    if (loc.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "근무위치를 선택해주세요.",
      });
      loc.focus();
      return;
    }
    if (dept.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "부서를 선택해주세요.",
      });
      dept.focus();
      return;
    }
    if (position.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "직급을 선택해주세요.",
      });
      position.focus();
      return;
    }
    if (rank.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "직책을 선택해주세요.",
      });
      rank.focus();
      return;
    }
    if (birthday.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "생년월일을 입력해주세요.",
      });
      birthday.focus();
      return;
    }
    if (mobile.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "핸드폰 번호를 입력해주세요.",
      });
      mobile.focus();
      return;
    }
    regExp = /^01([0|1|6|7|8|9]?)-([0-9]{3,4})-([0-9]{4})$/;
    if (!regExp.test(mobile.value)) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "올바르지 않은 형식입니다.",
      });
      mobile.focus();
      return;
    }
    if (email.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "이메일을 입력해주세요.",
      });
      email.focus();
      return;
    }
    regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!regExp.test(email.value)) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "올바르지 않은 형식입니다.",
      });
      email.focus();
      return;
    }
    if (addr1.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "warning",
        alertTitle: "알림",
        alertContent: "주소를 검색해주세요.",
      });
      addr1.focus();
      return;
    }

    this.setState({
      isConfirmOpen: true,
      confirmTitle: "변경",
      confirmContent: "입력하신 내용으로 직원정보를 변경하시겠습니까 ?",
      confirmSubmitHandler: this._empModifyConfirmSubmitDialogHandler,
    });
  };

  _empModifyConfirmSubmitDialogHandler = async () => {
    const name = document.getElementById("name-js");
    const loc = document.getElementById("loc-js");
    const dept = document.getElementById("dept-js");
    const position = document.getElementById("position-js");
    const rank = document.getElementById("rank-js");
    const birthday = document.getElementById("birthday-js");
    const mobile = document.getElementById("mobile-js");
    const email = document.getElementById("email-js");
    const addr1 = document.getElementById("addr1-js");
    const addr2 = document.getElementById("addr2-js");
    const zoneCode = document.getElementById("zoneCode-js");

    const { empInfo } = this.state;

    const data = {
      key: empInfo.docId,
      password: birthday.value.replace(/-/gi, "").substring(2, 8) + "a",
      empNo: "SD202000001",
      name: name.value,
      loc: loc.value,
      dept: dept.value,
      position: position.value,
      rank: rank.value,
      birthday: birthday.value,
      mobile: mobile.value,
      email: email.value,
      addr1: addr1.value,
      addr2: addr2.value,
      zoneCode: zoneCode.value,
      avatar: "..",
    };

    this.setState({
      isAlertOpen: true,
      alertType: "success",
      alertTitle: "알림",
      alertContent: "변경 되었습니다.",
      isEmpModifyFormOpen: false,
      isConfirmOpen: false,
    });

    const response = await fetch("/api/modifyEmpInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ data }),
    }).then(() => {
      this._dataClickHandler(empInfo.docId);
    });
  };

  _empModifyFormCloseDialogHandler = () => {
    this.setState({
      isEmpModifyFormOpen: false,
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
      confirmSubmitHandler: this._empRemoveConfirmSubmitDialogHandler,
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
        isLeftRefresh: !isLeftRefresh,
        empInfo: null,
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

  _profileChangeHandler = () => {
    const profile_file = document.getElementById("profile-file-js");
    const profile_image = document.getElementById("profile-image-js");

    if (profile_file.files && profile_file.files[0]) {
      const reader = new FileReader();

      reader.onload = function (e) {
        profile_image.firstChild.src = e.target.result;
      };

      reader.readAsDataURL(profile_file.files[0]);
    }
  };
}

export default MM0103;
