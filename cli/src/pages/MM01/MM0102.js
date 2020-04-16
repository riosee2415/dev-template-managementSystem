import React from "react";
import IconComponent from "../../components/material/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import AlertDialog from "../../components/material/AlertDialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormDialog from "../../components/material/FormDialog";
import ComboBox from "../../components/material/ComboBox";
import TextField from "../../components/material/TextField";
import DatePickers from "../../components/material/DatePickers";

class MM0102 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0102",
      selectCollection: ["employee", "annualHoliday"],
      dataInfo: null,
      isAlertOpen: false,
      alertType: null,
      alertTitle: null,
      alertContent: null,
      isUsedFormOpen: false,
      isUsageFormOpen: false,
      empList: [],
    };
  }

  componentDidMount = () => {
    this._getEmpList();
  };

  render() {
    const {
      pageCode,
      selectCollection,
      dataInfo,
      isAlertOpen,
      alertType,
      alertTitle,
      alertContent,
      isUsedFormOpen,
      isUsageFormOpen,
      empList,
    } = this.state;

    const columns = [
      { id: "year", label: "년도", align: "center", minWidth: 100 },
      {
        id: "allAnnual",
        label: "총 연차(일)",
        align: "center",
        minWidth: 100,
      },
      {
        id: "usedAnnual",
        label: "사용 연차(일)",
        align: "center",
        minWidth: 100,
      },
      {
        id: "applicationAnnual",
        label: "연차 사용",
        align: "center",
        minWidth: 150,
      },
      {
        id: "paymentSataus",
        label: "결제 상태",
        align: "center",
        minWidth: 150,
      },
    ];

    const usedlist = [
      { id: "number", label: "NO", align: "center", minWidth: 20 },
      { id: "applicationDay", label: "신청일", align: "center", minWidth: 90 },
      {
        id: "startDay",
        label: "시작일",
        align: "center",
        minWidth: 150,
      },
      { id: "endDay", label: "종료일", align: "center", minWidth: 150 },
      {
        id: "usedDay",
        label: "사용일",
        align: "center",
        minWidth: 90,
      },
      { id: "usageReason", label: "사유", align: "center", minWidth: 170 },
      {
        id: "annualSettlement",
        label: "결제자",
        align: "center",
        minWidth: 120,
      },
    ];

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>인사 관리 > 연차 관리</span>
            </div>

            {/* <div className="mh__content__btn">
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
                  className="btn btn-xs bg-orange"
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
                  className="btn btn-xs bg-violet"
                  value="작성"
                />
              </span>
            </div> */}
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
              <IconComponent iconName="fas fa-file-alt" />
              <span className="subTitle">연차 정보</span>
            </div>
            <div className="mc__col2__desc">
              {dataInfo ? (
                <>
                  <div className="dataInfo">
                    <div>{dataInfo.name}</div>
                    <div className="dataSubInfo">
                      <div>
                        <span>고용일 : </span>
                        {dataInfo.hire}
                      </div>
                      <div>
                        {dataInfo.hireYear}
                        <span>년차</span>
                      </div>
                    </div>
                  </div>
                </>
              ) : null}

              <Paper>
                <TableContainer>
                  <Table stickyHeader aria-label="sticky table">
                    {dataInfo ? (
                      <TableHead>
                        <TableRow>
                          {columns.map((column) => (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ minWidth: column.minWidth }}
                            >
                              {column.label}
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableHead>
                    ) : null}

                    {dataInfo
                      ? dataInfo.annualInfo.map((data) => {
                          return (
                            <TableBody className="annualTbody">
                              <TableRow
                                hover
                                role="checkbox"
                                className="annualTb"
                              >
                                <TableCell key={data.docId}>
                                  {data.year}
                                </TableCell>
                                <TableCell key={data.docId}>
                                  {data.allAnnual}
                                </TableCell>
                                <TableCell key={data.docId}>
                                  {data.usedAnnual}
                                </TableCell>
                                <TableCell>
                                  {data.year ===
                                  new Date().getFullYear() + "" ? (
                                    <input
                                      type="button"
                                      className="btn btn-xs bg-violet"
                                      value="신청"
                                      onClick={() =>
                                        this._usageApplicationHandler()
                                      }
                                    />
                                  ) : null}
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          );
                        })
                      : null}
                  </Table>
                </TableContainer>
              </Paper>

              {dataInfo ? (
                <input
                  type="button"
                  className="btn btn-l bg-blue usedList"
                  value="사용 내역"
                  onClick={() => this._usedAnnualHandler()}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* 연차 사용 신청 */}
        <FormDialog
          isOpen={isUsageFormOpen}
          title="연차 사용 신청"
          submitDialogHandler={this._addApplicationAnnualHandler}
          closeDialogHandler={this._closeUsageDialogBtnHandler}
        >
          {dataInfo ? (
            <>
              <div className="usageSubTitle">
                <div id="userName-js">{dataInfo.name}</div>
                <div id="applicationDay-js">
                  <span> 신청일 : </span>
                  {dataInfo.currentDate}
                </div>
              </div>
            </>
          ) : null}
          <div className="usageDays">
            <div>기간 : </div>
            <div className="usageStartEnd">
              <DatePickers
                id="annualStartDay-js"
                label="시작일"
                onChange={this._getUseDay}
              />
              <span> ~ </span>
              <DatePickers
                id="annualEndDay-js"
                label="종료일"
                onChange={this._getUseDay}
              />
              <div>
                총 : <span id="allusageDay-js" /> 일
              </div>
            </div>
          </div>

          <div className="applicationReason">
            <span>사유 : </span>
            <TextField
              id="applicationReason-js"
              type="text"
              label="사유"
              multiline
              margin="dense"
            />
          </div>

          <input type="file" id="applicationFile-js"></input>

          <div className="annualSettlement">
            <div className="personSettlement"> 결제자 :</div>
            <ComboBox
              options={empList}
              label="결제자"
              id="annualSettlement-js"
            />
          </div>
        </FormDialog>

        {/* 사용연차 리스트 */}
        <FormDialog
          isOpen={isUsedFormOpen}
          title="사용 연차 리스트"
          closeDialogHandler={this._closeDialogBtnHandler}
          isOnlyCheck={true}
        >
          <ComboBox options={empList} label="사용 연도" />

          <div>
            총 사용 연차 :
            {dataInfo
              ? dataInfo.annualInfo.map((data) => {
                  return (
                    <div>
                      {data.year === new Date().getFullYear + "" ? (
                        <div>{data.usedAnnual}</div>
                      ) : (
                        <div>0</div>
                      )}
                    </div>
                  );
                })
              : null}
          </div>

          <Paper>
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {usedlist.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>

                {dataInfo
                  ? dataInfo.annualInfo.map((data) => {
                      return (
                        <TableBody>
                          <TableRow hover role="checkbox" className="annualTb">
                            <TableCell>{data.year}</TableCell>
                            <TableCell>{data.usedAnnual}</TableCell>
                            <TableCell>{data.userRef}</TableCell>
                          </TableRow>
                        </TableBody>
                      );
                    })
                  : null}
              </Table>
            </TableContainer>
          </Paper>
        </FormDialog>

        {/* 접근권한 alert */}
        {isAlertOpen ? (
          <AlertDialog
            isOpen={isAlertOpen}
            type={alertType}
            title={alertTitle}
            content={alertContent}
            closeDialogHandler={() => this.setState({ isAlertOpen: false })}
          />
        ) : null}
      </div>
    );
  }

  _annualClickHandler = async (key) => {
    const response = await fetch("/api/getAnnualInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ key }),
    });

    const data = await response.json();

    const date = new Date();

    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    let d = date.getDate();

    m = m < 10 ? "0" + m : m;
    d = d < 10 ? "0" + d : d;

    const appDay = y + "-" + m + "-" + d;

    data.currentDate = appDay;

    const workYear = data.hire.substring(0, 4) - new Date().getFullYear() + 1;
    data.hireYear = workYear;

    if (data.empId === sessionStorage.login_id) {
      this.setState({
        dataInfo: data,
      });
    } else {
      this.setState({
        dataInfo: null,
      });
      setTimeout(() => {
        this.setState({
          isAlertOpen: true,
          alertType: "error",
          alertTitle: "알림",
          alertContent: "접근 권한이 없습니다.",
        });
      }, 0);
    }
  };

  _getUseDay = () => {
    const annualStartDay = document.getElementById("annualStartDay-js");
    const annualEndDay = document.getElementById("annualEndDay-js");

    const { dataInfo } = this.state;

    let sDay = annualStartDay.value.replace(/-/gi, "");

    let eDay = annualEndDay.value.replace(/-/gi, "");
    eDay = eDay.replace("-", "");

    sDay = parseInt(sDay);
    eDay = parseInt(eDay);

    if (sDay === parseInt(dataInfo.currentDate.replace(/-/gi, ""))) {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "시작일은 신청일과 같을 수 없습니다.",
      });
      return;
    } else if (eDay < sDay) {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "종료일은 시작일 이후여야 합니다.",
      });
      return;
    } else if (eDay - sDay > 14) {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "15일 이상은 신청할 수 없습니다.",
      });

      return;
    }

    // if (eDay < sDay) {
    //   setTimeout(() => {
    //     this.setState({
    //       isAlertOpen: true,
    //       alertType: "error",
    //       alertTitle: "알림",
    //       alertContent: "종료일은 시작일 이후여야 합니다.",
    //     });
    //   }, 0);
    //   return;
    // } else if (eDay - sDay > 14) {
    //   setTimeout(() => {
    //     this.setState({
    //       isAlertOpen: true,
    //       alertType: "error",
    //       alertTitle: "알림",
    //       alertContent: "15일 이상은 신청할 수 없습니다.",
    //     });
    //   }, 0);

    //   return;
    // }

    const useDay = eDay - sDay + 1;

    const eMs = document.getElementById("allusageDay-js");

    eMs.innerHTML = useDay;
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

    // empList 에서 sessionStorage랑 같은 거 빼고 넣어주기

    this.setState({
      empList: data,
    });
  };

  _usageApplicationHandler = () => {
    this.setState({ isUsageFormOpen: true });
  };

  _addApplicationAnnualHandler = async () => {
    const { annualUsage } = this.setState;

    const userName = document.getElementById("userName-js");
    const applicationDay = document.getElementById("applicationDay-js");
    const annualStartDay = document.getElementById("annualStartDay-js");
    const annualEndDay = document.getElementById("annualEndDay-js");
    const allusageDay = document.getElementById("allusageDay-js");
    const usageReason = document.getElementById("applicationReason-js");
    const applicationFile = document.getElementById("applicationFile-js");
    const annualSettlement = document.getElementById("annualSettlement-js");

    if (usageReason.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "사유를 작성해주세요.",
      });
      usageReason.focus();
      return;
    } else if (usageReason.value === isNaN) {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "문자를 입력해주세요.",
      });
      return;
    }

    if (annualSettlement.value.length < 1) {
      this.setState({
        isAlertOpen: true,
        alertType: "error",
        alertTitle: "알림",
        alertContent: "결제자를 선택해주세요.",
      });
      annualSettlement.focus();
      return;
    }

    console.dir(allusageDay);

    const addAnnualDate = {
      userName: userName.innerText,
      applicationDay: applicationDay.innerText,
      annualStartDay: annualStartDay.value,
      annualEndDay: annualEndDay.value,
      allusageDay: allusageDay.innerText,
      usageReason: usageReason.value,
      applicationFile: applicationFile.value,
      annualSettlement: annualSettlement.value,
    };

    console.log(addAnnualDate);
  };

  _closeUsageDialogBtnHandler = () => {
    this.setState({ isUsageFormOpen: false });
  };

  _usedAnnualHandler = () => {
    this.setState({ isUsedFormOpen: true });
  };

  _closeDialogBtnHandler = () => {
    this.setState({ isUsedFormOpen: false });
  };
}

export default MM0102;
