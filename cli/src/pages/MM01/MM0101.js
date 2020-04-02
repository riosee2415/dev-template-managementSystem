import React from "react";
import IconComponent from "../../components/IconComponent";

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
      workEnd: ""
    };
  }

  componentDidMount() {
    setInterval(() => {
      setInterval(this._playCurrentTime(), 1000);
    }, 1000);
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
      workEnd
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
              <span classsName="subTitle">출/퇴근 등록</span>
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
                    onClick={this._startWorkHandler}
                  >
                    출근
                  </button>
                  <button className="btn btn-m bg-gridient2">퇴근</button>
                </div>
                <div className="mm0101__left__col3">
                  <div className="mm0101__left__col3__row1">
                    <span>출근시간</span> <span>{workStart}</span>
                  </div>
                  <div className="mm0101__left__col3__row2">
                    <span>퇴근시간</span> <span>{workEnd}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mc__col2">
            <div className="mc__col2__title">
              <IconComponent iconName="fas fa-list-ul" />
              <span classsName="subTitle">출/퇴근 내역</span>
            </div>
            <div className="mc__col2__desc">desc</div>
          </div>
        </div>
      </div>
    );
  }

  _startWorkHandler = async () => {
    const {
      currentHour,
      currentMin,
      currentSec,
      currentYear,
      currentMonth,
      currentDate,
      currentDay
    } = this.state;

    const inputDate = currentYear + "/" + currentMonth + "/" + currentDate;
    const name = sessionStorage.getItem("login_name");
    const inputStartTime = currentHour + "/" + currentMin + "/" + currentSec;

    const inputData = {
      inputDate,
      name,
      inputStartTime
    };

    const response = await fetch("/api/saveWorkTimeToStart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ inputData })
    });
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
      currentDate: date.getDate()
    });
  };
}

export default MM0101;
