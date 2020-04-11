import React from "react";
import IconComponent from "../../components/material/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import TabBox from "../../components/TabBox";
import TopArea from "../../components/projectView/TopArea";
import WorkList from "../../components/projectView/WorkList";
import FormDialog from "../../components/material/FormDialog";
import { TextField } from "@material-ui/core";
import ComboBox from "../../components/material/ComboBox";
import middleware from "../../middleware/common";
import OutlinedButton from "../../components/material/OutlinedButton";
import DatePickers from "../../components/material/DatePickers";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Grid from "@material-ui/core/Grid";

class MM0202 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0202",
      selectCollection: ["progress_projects"],
      projectInfo: null,
      projectWorkList: null,
      isLeftRefresh: false,
      isRegistFormOpen: false,
      workType: [],
      empList: [],
      isReload: false,
      selectedTab: 0,
      clientInfo: null
    };
  }

  componentDidMount = async () => {
    // get WorkType
    const data = await middleware.getCommonData("common", "workType");
    let arr = [];
    arr.push({ title: data.data1 });
    arr.push({ title: data.data2 });

    // get EmpList
    this._getEmpList();

    this.setState({
      workType: arr
    });
  };

  render() {
    const {
      pageCode,
      selectCollection,
      isLeftRefresh,
      projectInfo,
      projectWorkList,
      workType,
      empList,
      isRegistFormOpen,
      selectedTab,
      clientInfo
    } = this.state;

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>프로젝트 관리 > 진행 프로젝트</span>
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
            </div>
          </div>
        </div>

        <div className="mm__content mc">
          <div className="mc__col1">
            <div className="mc__col1__title">
              <IconComponent iconName="fas fa-list-ul" />
              <span className="subTitle">프로젝트 리스트</span>
            </div>
            <div className="mc__col1__desc">
              <LeftListBox
                title_01="번호"
                title_02="프로젝트명"
                title_03="유형"
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
              <div className="project-info-main">
                {projectInfo ? (
                  <>
                    <TopArea
                      projectRef={projectInfo.ref}
                      PM={projectInfo.PM}
                      clientRef={projectInfo.clientRef}
                      contactFile={projectInfo.contactFile}
                      endDate={projectInfo.endDate}
                      estimateFile={projectInfo.estimateFile}
                      exDate={projectInfo.exDate}
                      insDate={projectInfo.insDate}
                      name={projectInfo.name}
                      profit={projectInfo.profit}
                      startDate={projectInfo.startDate}
                      type={projectInfo.type}
                    />

                    <TabBox
                      tabs={[
                        {
                          label: "거래처정보",
                          action: this._clientInfoHandler,
                          param1: projectInfo.clientRef,
                          param2: null,
                          param3: null,
                          param4: null
                        },
                        {
                          label: "업무차트",
                          action: this._progressBtnHandler,
                          param1: projectInfo.ref,
                          param2: null,
                          param3: null,
                          param4: null
                        }
                      ]}
                      selectedTab={selectedTab}
                      tabChangeHandler={value => {
                        this.setState({ selectedTab: value });
                      }}
                    />
                    {selectedTab === 1 ? (
                      <div>
                        {clientInfo ? (
                          <div>
                            <div className="clientBlock">
                              <div>사업자번호</div>
                              <div>{clientInfo.businessNumber}</div>
                            </div>

                            <div className="clientBlock">
                              <div>상호명</div>
                              <div>{clientInfo.name}</div>
                            </div>
                            <div className="clientBlock">
                              <div>대표자명</div>
                              <div>{clientInfo.chiefName}</div>
                            </div>

                            <div className="clientBlock">
                              <div>업태</div>
                              <div>{clientInfo.business}</div>
                            </div>

                            <div className="clientBlock">
                              <div>종목</div>
                              <div>{clientInfo.type}</div>
                            </div>

                            <div className="clientBlock">
                              <div>사업자유형</div>
                              <div>{clientInfo.BP}</div>
                            </div>

                            <div className="clientBlock">
                              <div>과세유형</div>
                              <div>{clientInfo.taxation}</div>
                            </div>

                            <div className="clientBlock">
                              <div>사업자주소</div>
                              <div>{clientInfo.address}</div>
                            </div>
                          </div>
                        ) : null}
                      </div>
                    ) : null}
                    {selectedTab === 2 ? (
                      <div>
                        {projectWorkList ? (
                          <>
                            <div className="mm-add">
                              <OutlinedButton
                                className="mm-add-btn"
                                onClick={() => this._addBtnHandler()}
                              >
                                업무추가
                              </OutlinedButton>
                            </div>

                            <div>
                              <ul
                                className="workList-main"
                                key={this.props.idx}
                              >
                                <li>번호</li>
                                <li>업무</li>
                                <li>코드</li>
                                <li>유형</li>
                                <li>담당자</li>
                                <li>작업일</li>
                                <li>업무내용</li>
                                <li>상태</li>
                                <li>삭제</li>
                              </ul>
                            </div>
                          </>
                        ) : null}
                        <div className="workList-main-box scrollbar scroll-vertical">
                          {projectWorkList
                            ? projectWorkList.map((doc, idx) => {
                                return (
                                  <WorkList
                                    key={idx}
                                    idx={idx + 1}
                                    workRef={doc.workRef}
                                    workName={doc.workName}
                                    result={doc.result}
                                    workCode={doc.workCode}
                                    workDate={doc.workDate}
                                    workDesc={doc.workDesc}
                                    workEmp={doc.workEmp}
                                    workType={doc.workType}
                                    delConfirm={this._deleteConfirm}
                                    descViewHandler={this._descViewHandler}
                                    changeStatus={this._changedStatus}
                                  />
                                );
                              })
                            : null}
                        </div>
                      </div>
                    ) : null}
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <FormDialog
          isOpen={isRegistFormOpen}
          title="업무 등록"
          submitDialogHandler={this._addBtnSubmitDialogHandler}
          closeDialogHandler={this._addBtnCloseDialogHandler}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="workName-js"
                type="text"
                label="업무"
                autoFocus
                fullWidth
              />
            </Grid>
            <Grid item xs={12}>
              <TextField id="workCode-js" type="text" label="코드" fullWidth />
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="workDesc-js"
                type="text"
                label="업무내용"
                fullWidth
                multiline={true}
                rowsMax="10"
              />
            </Grid>
            <Grid item xs={6}>
              <ComboBox id="workType-js" options={workType} label="업무유형" />
            </Grid>
            <Grid item xs={6}>
              <ComboBox id="workEmp-js" options={empList} label="담당자" />
            </Grid>
            <Grid item xs={12}>
              <DatePickers id="workDate-js" label="작업일" />
            </Grid>
          </Grid>
        </FormDialog>
      </div>
    );
  }

  _clientInfoHandler = async cliRef => {
    const { clientInfo } = this.state;

    const response = await fetch("/api/getClientInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ cliRef })
    });

    const data = await response.json();

    this.setState({
      clientInfo: data
    });
  };

  _deleteConfirm = workRef => {
    console.log(sessionStorage.getItem("login_name"));

    const { projectInfo } = this.state;

    if (projectInfo.PM !== sessionStorage.getItem("login_name")) {
      confirmAlert({
        title: "접근권한 불가",
        message: "업무를 삭제할 수 없습니다. PM에게 문의하세요.",
        buttons: [
          {
            label: "닫기",
            onClick: () => {}
          }
        ]
      });

      return;
    }

    confirmAlert({
      title: "작업리스트 삭제 확인",
      message: "삭제한 작업리스틑 되돌릴 수 없습니다. 삭제하시겠습니까 ?",
      buttons: [
        {
          label: "예",
          onClick: () => this._workDeleteHandler(workRef)
        },
        {
          label: "취소",
          onClick: () => {}
        }
      ]
    });
  };

  _changedStatus = async workRef => {
    const { projectInfo } = this.state;
    const parentKey = projectInfo.ref;

    const response = await fetch("/api/changedWorkListStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ workRef, parentKey })
    }).then(this._progressBtnHandler(projectInfo.ref));
  };

  _workDeleteHandler = async workRef => {
    const { projectInfo } = this.state;
    const parentKey = projectInfo.ref;

    const response = await fetch("/api/deleteWorkList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ workRef, parentKey })
    }).then(this._progressBtnHandler(projectInfo.ref));
  };

  _getEmpList = async () => {
    const response = await fetch("/api/getEmpList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({})
    });
    const data = await response.json();
    this.setState({
      empList: data
    });
  };

  _addBtnHandler = () => {
    this.setState({
      isRegistFormOpen: true
    });
  };

  _addBtnSubmitDialogHandler = async () => {
    const { projectInfo } = this.state;

    const workName = document.getElementById("workName-js");
    const workCode = document.getElementById("workCode-js");
    const workDesc = document.getElementById("workDesc-js");
    const workType = document.getElementById("workType-js");
    const workEmp = document.getElementById("workEmp-js");
    const workDate = document.getElementById("workDate-js");

    if (workName.value.length < 1) {
      workName.focus();
      return;
    }

    if (workCode.value.length < 1) {
      workCode.focus();
      return;
    }

    if (workDesc.value.length < 1) {
      workDesc.focus();
      return;
    }

    if (workType.value.length < 1) {
      workType.focus();
      return;
    }

    if (workEmp.value.length < 1) {
      workEmp.focus();
      return;
    }

    const addData = {
      workName: workName.value,
      workCode: workCode.value,
      workDesc: workDesc.value,
      workType: workType.value,
      workEmp: workEmp.value,
      result: "0",
      workDate: workDate.value,
      key: projectInfo.ref
    };

    this.setState({
      isRegistFormOpen: false
    });

    const response = await fetch("/api/addWorkList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ addData })
    }).then(this._progressBtnHandler(projectInfo.ref));
  };

  _addBtnCloseDialogHandler = () => {
    this.setState({
      isRegistFormOpen: false
    });
  };

  _progressBtnHandler = async projectId => {
    const response = await fetch("/api/getProjectWorkListInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ projectId })
    });
    const data = await response.json();

    this.setState({
      projectWorkList: data
    });
  };

  _dataClickHandler = async key => {
    const response = await fetch("/api/getProjectInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key })
    });
    const data = await response.json();
    this.setState({
      projectInfo: data,
      selectedTab: 2
    });

    this._progressBtnHandler(this.state.projectInfo.ref);
  };
}

export default MM0202;
