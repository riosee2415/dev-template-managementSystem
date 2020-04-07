import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Paprer from "@material-ui/core/Paper";
import Paper from "@material-ui/core/Paper";

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
      alertContent: null
    };
  }

  render() {
    const { pageCode, selectCollection, dataInfo } = this.state;

    const columns = [
      { id: "year", label: "년도", align: "center", minWidth: 170 },
      {
        id: "allAnnual",
        label: "총 연차",
        align: "center",
        minWidth: 170
      },
      {
        id: "usedAnnual",
        label: "사용 연차",
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
                  <div>
                    <div>{dataInfo.name}</div>
                    <div>
                      <div>{dataInfo.hire}</div>
                      <div>{dataInfo.hireYear}년차</div>
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
                              </TableRow>
                            </TableBody>
                          );
                        })
                      : null}
                  </Table>
                </TableContainer>
              </Paper>
            </div>
          </div>
        </div>

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

  _annualClickHandler = async key => {
    const response = await fetch("/api/getAnnualInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ key })
    });

    const data = await response.json();

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
        alert("접근 권한이 없습니다.");
        this.setState({
          isAlertOpen: true,
          alertType: "error",
          alertTitle: "알림",
          alertContent: "접근 권한이 없습니다."
        });
      }, 1);
    }
  };
}

export default MM0102;
