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
      empList: []
    };
  }

  // componentDidMount = () => {
  //   const annualStartDay = document.getElementById("annualStartDay");
  //   const annualEndDay = document.getElementById("annuaEndDay");
  //   console.log(annualStartDay, annuaEndDay);
  // };

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
      isUsageFormOpen
    } = this.state;

    const columns = [
      { id: "year", label: "년도", align: "center", minWidth: 100 },
      {
        id: "allAnnual",
        label: "총 연차(일)",
        align: "center",
        minWidth: 100
      },
      {
        id: "usedAnnual",
        label: "사용 연차(일)",
        align: "center",
        minWidth: 100
      },
      {
        id: "applicationAnnual",
        label: "연차 사용",
        align: "center",
        minWidth: 150
      },
      {
        id: "paymentSataus",
        label: "결제 상태",
        align: "center",
        minWidth: 150
      }
    ];

    const usedlist = [
      {
        id: "year",
        label: "사용일",
        align: "center",
        minWidth: 170
      },
      { id: "year", label: "사용 연차(일)", align: "center", minWidth: 170 },
      {
        id: "whtused",
        label: "사유",
        align: "center",
        minWidth: 170
      }
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
              <IconComponent iconName="fas fa-play" />
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
                          {columns.map(column => (
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
                      ? dataInfo.annualInfo.map(data => {
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
                <div>{dataInfo.name}</div>
                <div>신청일 : {dataInfo.currentDate}</div>
              </div>
            </>
          ) : null}
          <div className="usageDays">
            <div>기간 : </div>
            <div className="usageStartEnd">
              <DatePickers id="annualStartDay" label="시작일" />
              <span> ~ </span>
              <DatePickers
                id="annualEndDay"
                label="종료일"
                onChange={this._getUseDay}
              />
              <div id="allusageDay-js">(총 : 일)</div>
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

          <input type="file"></input>

          <div className="annualSettlement">
            <div className="personSettlement"> 결제자 :</div>

            <ComboBox
              options={[{ title: "aaa" }, { title: "bbb" }]}
              label="결제자"
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
          <ComboBox options={[{ title: "aaa" }, { title: "aaa" }]} label="aa" />

          <div>
            총 사용 연차 :
            {dataInfo
              ? dataInfo.annualInfo.map(data => {
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
                    {usedlist.map(column => (
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
                  ? dataInfo.annualInfo.map(data => {
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

  _annualClickHandler = async key => {
    const response = await fetch("/api/getAnnualInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key })
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
        dataInfo: data
      });
    } else {
      this.setState({
        dataInfo: null
      });
      setTimeout(() => {
        this.setState({
          isAlertOpen: true,
          alertType: "error",
          alertTitle: "알림",
          alertContent: "접근 권한이 없습니다."
        });
      }, 0);
    }
  };

  _getUseDay = () => {
    const annualStartDay = document.getElementById("annualStartDay");
    const annualEndDay = document.getElementById("annualEndDay");

    let sDay = annualStartDay.value.replace("-", "");
    sDay = sDay.replace("-", "");

    let eDay = annualEndDay.value.replace("-", "");
    eDay = eDay.replace("-", "");

    sDay = parseInt(sDay);
    eDay = parseInt(eDay);

    if (eDay < sDay) {
      alert("종료일이 시작이보다 ");
      return;
    } else if (eDay - sDay > 15) {
      alert("15일 이상은 신청할 수 없습니다.");
      return;
    }

    const useDay = eDay - sDay + 1;

    const eMs = document.getElementById("allusageDay-js");

    eMs.innerHTML = useDay;

    console.log(useDay);
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

  _usageApplicationHandler = () => {
    this.setState({ isUsageFormOpen: true });
  };

  _addApplicationAnnualHandler = () => {};

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
