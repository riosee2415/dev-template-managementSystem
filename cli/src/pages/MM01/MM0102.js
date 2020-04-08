import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import AlertDialog from "../../components/AlertDialog";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import FormDialog from "../../components/FormDialog";
import ComboBox from "../../components/ComboBox";

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
    };
  }

  render() {
    const { pageCode, selectCollection, dataInfo } = this.state;

    const columns = [
      { id: "year", label: "년도", align: "center", minWidth: 170 },
      {
        id: "allAnnual",
        label: "총 연차(일)",
        align: "center",
        minWidth: 170,
      },
      {
        id: "usedAnnual",
        label: "사용 연차(일)",
        align: "center",
        minWidth: 170,
      },
      {
        id: "applicationAnnual",
        label: "연차 사용",
        align: "center",
        minWidth: 170,
      },
    ];

    const usedlist = [
      {
        id: "year",
        label: "사용일",
        align: "center",
        minWidth: 170,
      },
      { id: "year", label: "사용 연차(일)", align: "center", minWidth: 170 },
      {
        id: "whtused",
        label: "사유",
        align: "center",
        minWidth: 170,
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
                        <span>고용일 :</span>
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
                            <TableBody>
                              <TableRow hover role="checkbox">
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
                                      value="사용"
                                      onClick={() =>
                                        this.__usageApplicationHandler()
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
                  className="btn btn-l bg-blue usedlist"
                  value="사용 내역"
                  onClick={() => this.__usedAnnualHandler()}
                />
              ) : null}
            </div>
          </div>
        </div>

        {/* 사용연차 리스트 */}
        <FormDialog
          open={this.state.isUsedFormOpen}
          title="사용 연차 리스트"
          closeDialogHandler={this._closeDialogBtnHandler}
          isOnlyCheck={true}
        >
          <ComboBox dataList={[{ title: "aaa" }, { title: "aaa" }]}></ComboBox>

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
                          <TableRow hover role="checkbox">
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
        {this.state.isAlertOpen ? (
          <AlertDialog
            isOpen={this.state.isAlertOpen}
            type={this.state.alertType}
            title={this.state.alertTitle}
            content={this.state.alertContent}
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

  __usedAnnualHandler = () => {
    this.setState({ isUsedFormOpen: true });
  };

  _closeDialogBtnHandler = () => {
    this.setState({ isUsedFormOpen: false });
  };
}

export default MM0102;
