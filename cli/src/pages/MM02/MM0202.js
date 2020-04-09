import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import TopArea from "../../components/projectView/TopArea";
import WorkList from "../../components/projectView/WorkList";
import FormDialog from "../../components/FormDialog";
import { TextField } from "@material-ui/core";
import ComboBox from "../../components/ComboBox";
import middleware from "../../middleware/common";
import OutlinedButtonFull from "../../components/material/OutlinedButtonFull";
import OutlinedButton from "../../components/material/OutlinedButton";
import DatePickers from "../../components/material/DatePickers";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

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
      workType: arr,
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
      isDescFormOpen,
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
                    <div className="mc__col2__desc__btnArea">
                      <OutlinedButtonFull text="거래처정보" color="primary" />
                      <OutlinedButtonFull
                        action={() => this._progressBtnHandler(projectInfo.ref)}
                        text="업무차트"
                        color="primary"
                      />
                    </div>

                    <div>
                      {projectWorkList ? (
                        <>
                          <div className="mm-add">
                            <OutlinedButton
                              text="업무추가"
                              className="mm-add-btn"
                              action={() => this._addBtnHandler()}
                            />
                          </div>

                          <div>
                            <ul className="workList-main" key={this.props.idx}>
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
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
        <FormDialog
          isOpen={isRegistFormOpen}
          title="업무 등록"
          //content="등록할 직원정보를 입력해주세요."
          submitDialogHandler={this._addBtnSubmitDialogHandler}
          closeDialogHandler={this._addBtnCloseDialogHandler}
        >
          <TextField
            id="workName-js"
            autoFocus
            margin="dense"
            label="업무"
            type="text"
            fullWidth
          />

          <TextField
            id="workCode-js"
            autoFocus
            margin="dense"
            label="코드"
            type="text"
            fullWidth
          />

          <TextField
            id="workDesc-js"
            autoFocus
            margin="dense"
            label="업무내용"
            type="text"
            fullWidth
            multiline={true}
            rowsMax="10"
          />
          <div style={{ width: "100%", height: 15 }}></div>
          <div className="comboArea" id="comboArea-js">
            <ComboBox
              dataList={workType}
              title="업무유형"
              txtId="workType-js"
            />

            <div style={{ width: "100%", height: 15 }}></div>
            <ComboBox dataList={empList} title="담당자" txtId="workEmp-js" />
          </div>

          <DatePickers lab="작업일" dateId="workDate-js" />
        </FormDialog>
      </div>
    );
  }

  _deleteConfirm = (workRef) => {
    console.log(sessionStorage.getItem("login_name"));

    const { projectInfo } = this.state;

    if (projectInfo.PM !== sessionStorage.getItem("login_name")) {
      confirmAlert({
        title: "접근권한 불가",
        message: "업무를 삭제할 수 없습니다. PM에게 문의하세요.",
        buttons: [
          {
            label: "닫기",
            onClick: () => {},
          },
        ],
      });

      return;
    }

    confirmAlert({
      title: "작업리스트 삭제 확인",
      message: "삭제한 작업리스틑 되돌릴 수 없습니다. 삭제하시겠습니까 ?",
      buttons: [
        {
          label: "예",
          onClick: () => this._workDeleteHandler(workRef),
        },
        {
          label: "취소",
          onClick: () => {},
        },
      ],
    });
  };

  _changedStatus = async (workRef) => {
    const { projectInfo } = this.state;
    const parentKey = projectInfo.ref;

    const response = await fetch("/api/changedWorkListStatus", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ workRef, parentKey }),
    }).then(this._progressBtnHandler(projectInfo.ref));
  };

  _workDeleteHandler = async (workRef) => {
    const { projectInfo } = this.state;
    const parentKey = projectInfo.ref;

    const response = await fetch("/api/deleteWorkList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ workRef, parentKey }),
    }).then(this._progressBtnHandler(projectInfo.ref));
  };

  _getEmpList = async () => {
    const response = await fetch("/api/getEmpList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({}),
    });
    const data = await response.json();
    this.setState({
      empList: data,
    });
  };

  _addBtnHandler = () => {
    this.setState({
      isRegistFormOpen: true,
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
      key: projectInfo.ref,
    };

    this.setState({
      isRegistFormOpen: false,
    });

    const response = await fetch("/api/addWorkList", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ addData }),
    }).then(this._progressBtnHandler(projectInfo.ref));
  };

  _addBtnCloseDialogHandler = () => {
    this.setState({
      isRegistFormOpen: false,
    });
  };

  _progressBtnHandler = async (projectId) => {
    const response = await fetch("/api/getProjectWorkListInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ projectId }),
    });
    const data = await response.json();

    this.setState({
      projectWorkList: data,
    });
  };

  _dataClickHandler = async (key) => {
    const response = await fetch("/api/getProjectInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key }),
    });
    const data = await response.json();
    this.setState({
      projectInfo: data,
    });
  };
}

export default MM0202;
