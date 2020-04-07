import React from "react";
import IconComponent from "../../components/IconComponent";
import AlertDialog from "../../components/AlertDialog";

class MM0101 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentHour: 0,
      currentMin: 0,
      currentSec: 0,
      currentYear: 0,
      currentMonth: 0,
      currentDate: 0,
      currentDay: 0,
      workStart: "",
      workEnd: "",
      fsId: "",
      screenReload: false,
      detailList: [],
      isStartWorkAlertOpen: false,
      isReflash: false,
    };
  }

  componentDidMount() {
    setInterval(() => {
      setInterval(this._playCurrentTime(), 1000);
    }, 100);

    this._getworkStart();

    this._getDetailData();

    this.setState({
      isStartWorkAlertOpen: false,
    });
    console.log("didMount");
  }

  render() {
    const {
      currentHour,
      currentMin,
      currentSec,
      currentDay,
      currentYear,
      currentMonth,
      currentDate,
      workStart,
      workEnd,
      fsId,
      detailList,
      isStartWorkAlertOpen,
    } = this.state;

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>인사 관리 > 출퇴근 관리</span>
            </div>

            <div className="mh__content__btn">
              {/* <span>
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
              </span> */}
            </div>
          </div>
        </div>

        <div className="mm__content mc">
          <div className="mc__col1">
            <div className="mc__col1__title">
              <IconComponent iconName="fas fa-clock" />
              <span className="subTitle">출/퇴근 등록</span>
            </div>
            <div className="mc__col1__desc">
              <div className="mm0101__left">
                <div className="mm0101__left__col1">
                  <span>
                    {currentHour < 10 ? "0" + currentHour : currentHour}:
                    {currentMin < 10 ? "0" + currentMin : currentMin}:
                    {currentSec < 10 ? "0" + currentSec : currentSec}
                  </span>
                  <span>
                    {currentYear}년{currentMonth}월{currentDate}일{currentDay}
                    요일
                  </span>
                </div>
                <div className="mm0101__left__col2">
                  <button
                    className="btn btn-m bg-gradient"
                    onClick={() => {
                      this._startWorkHandler();
                    }}
                  >
                    출근
                  </button>
                  <button
                    className="btn btn-m bg-gridient2"
                    onClick={() => this._endWorkHandler()}
                  >
                    퇴근
                  </button>
                </div>
                <div className="mm0101__left__col3">
                  <div className="mm0101__left__col3__row1">
                    <span>출근시간</span>
                    <span id="workStart-js">{workStart}</span>
                  </div>
                  <div className="mm0101__left__col3__row2">
                    <span>퇴근시간</span>
                    <span id="workEnd-js">{workEnd}</span>
                  </div>
                  <div className="mm0101__left__col3__row3">
                    <span>아이디</span>
                    <span id="workId-js">{fsId}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mc__col2">
            <div className="mc__col2__title">
              <IconComponent iconName="fas fa-list-ul" />
              <span className="subTitle">출/퇴근 내역 ( 최근 5일 )</span>
            </div>
            <div className="mc__col2__desc">
              {detailList ? (
                detailList.map((data, idx) => {
                  return (
                    <div key={idx} className="mm0101__dataBox">
                      <div>{idx + 1}</div>
                      <div>{data.date}</div>
                      <div>
                        <span>출근</span>
                        {data.startTime}
                      </div>
                      <div>
                        <span>퇴근</span>
                        {data.endTime}
                      </div>
                    </div>
                  );
                })
              ) : (
                <div> 출/퇴근 데이터가 없습니다. </div>
              )}
            </div>
          </div>
        </div>

        {isStartWorkAlertOpen ? (
          <AlertDialog
            isOpen={isStartWorkAlertOpen}
            type="error"
            title="실행불가"
            msg="출근은 하루 한번만 가능합니다."
            closeDialogHandler={() => (this.state.isStartWorkAlertOpen = false)}
          />
        ) : null}
      </div>
    );
  }

  _getDetailData = async () => {
    const inputData = {
      inputId: sessionStorage.getItem("login_id"),
    };

    const response = await fetch("/api/getDetailDataToWorkTime", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ inputData }),
    });

    let dataList = await response.json();

    this.setState({
      detailList: dataList,
    });
  };

  _getworkStart = async () => {
    let date = new Date();
    const inputData = {
      id: sessionStorage.getItem("login_id"),
      date:
        date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate(),
    };

    const response = await fetch("/api/getworkStart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ inputData }),
    });
    const data = await response.json();

    this.setState({
      workStart: data.startTime,
      workEnd: data.endTime,
      fsId: data.id,
    });
  };

  _startWorkHandler = async () => {
    const validation1 = document.getElementById("workStart-js");

    if (validation1.innerText.length > 0) {
      await this.setState({
        alert: false,
      });

      this.setState({
        isStartWorkAlertOpen: true,
      });
      return;
    }

    const {
      currentHour,
      currentMin,
      currentSec,
      currentYear,
      currentMonth,
      currentDate,
    } = this.state;

    if (currentHour === 0) {
      return;
    }

    const inputDate = currentYear + "/" + currentMonth + "/" + currentDate;
    const id = sessionStorage.getItem("login_id");
    const inputStartTime =
      (currentHour < 10 ? "0" + currentHour : currentHour) +
      ":" +
      (currentMin < 10 ? "0" + currentMin : currentMin) +
      ":" +
      (currentSec < 10 ? "0" + currentSec : currentSec);
    const inputData = {
      inputDate,
      id,
      inputStartTime,
    };

    await fetch("/api/saveWorkTimeToStart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ inputData }),
    }).then(this.componentDidMount());
  };

  _endWorkHandler = async () => {
    const { currentHour, currentMin, currentSec, fsId } = this.state;

    const inputEndTime =
      (currentHour < 10 ? "0" + currentHour : currentHour) +
      ":" +
      (currentMin < 10 ? "0" + currentMin : currentMin) +
      ":" +
      (currentSec < 10 ? "0" + currentSec : currentSec);

    const inputData = {
      fsId,
      inputEndTime,
    };

    await fetch("/api/saveWorkTimeToEnd", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ inputData }),
    }).then(this.componentDidMount());
  };

  _playCurrentTime = () => {
    let date = new Date();
    let currentDay = "";

    switch ("" + date.getDay()) {
      case "1":
        currentDay = "월";
        break;
      case "2":
        currentDay = "화";
        break;
      case "3":
        currentDay = "수";
        break;
      case "4":
        currentDay = "목";
        break;
      case "5":
        currentDay = "금";
        break;
      case "6":
        currentDay = "토";
        break;
      case "7":
        currentDay = "일";
        break;
    }

    this.setState({
      currentHour: date.getHours(),
      currentMin: date.getMinutes(),
      currentSec: date.getSeconds(),
      currentDay: currentDay,
      currentYear: date.getFullYear(),
      currentMonth: date.getMonth() + 1,
      currentDate: date.getDate(),
    });
  };
}

export default MM0101;
