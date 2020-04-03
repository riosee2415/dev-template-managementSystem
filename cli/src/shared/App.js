import React from "react";
import { Route } from "react-router-dom";
import {
  Home,
  MM0101,
  MM0102,
  MM0103,
  MM0201,
  MM0202,
  MM0203,
  MM0301,
  MM0302,
  MM0401,
  MM0402,
  MM0403,
  MM0501,
  MM0502,
  MM0503,
  MM0601,
  MM0602,
  MM0603,
  MM0701
} from "../pages";
import LoginBox from "../components/LoginBox";
import routes from "../routes";
import Menu from "../components/Menu";
import "../styles/styles.css";
import IconComponent from "../components/IconComponent";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: false
    };
  }

  componentDidMount() {
    const validatorData = sessionStorage.getItem("login_id");

    if (validatorData != null) {
      this._aleadyLogined();
    }
  }

  render() {
    const { loginStatus } = this.state;

    return (
      <div className="sys">
        <div className="sys__header">
          <div className="hd-logo-box">
            <div className="hd-logo"></div>
          </div>

          {loginStatus ? (
            <div className="hd-left">
              <div className="hd-search">
                <span className="hd-search__txt" id="search__txt-js">
                  <input type="text" />
                </span>
                <span className="hd-search__btn">
                  <button type="button" onClick={this._searchClickHandler}>
                    <IconComponent iconName="fas fa-search" />
                  </button>
                </span>
              </div>
              <div className="hd-logout" onClick={this._logoutHandler}>
                <IconComponent iconName="fas fa-sign-out-alt" />
                <span className="hd-logout__txt">logout</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="sys__main">
          {loginStatus ? (
            <>
              <div className="sys__menu">
                <Menu />
              </div>
              <div className="sys__content">
                <Route exact path={routes.HOME} component={Home} />
                {/* MM01 인사관리 */}
                <Route exact path={routes.MM0101} component={MM0101} />
                <Route exact path={routes.MM0102} component={MM0102} />
                <Route exact path={routes.MM0103} component={MM0103} />

                {/* MM02 프로젝트 관리 */}
                <Route exact path={routes.MM0201} component={MM0201} />
                <Route exact path={routes.MM0202} component={MM0202} />
                <Route exact path={routes.MM0203} component={MM0203} />

                {/* MM03 유지보수 관리 */}
                <Route exact path={routes.MM0301} component={MM0301} />
                <Route exact path={routes.MM0302} component={MM0302} />

                {/* MM04 커뮤니티 */}
                <Route exact path={routes.MM0401} component={MM0401} />
                <Route exact path={routes.MM0402} component={MM0402} />
                <Route exact path={routes.MM0403} component={MM0403} />

                {/* MM05 수익 관리 */}
                <Route exact path={routes.MM0501} component={MM0501} />
                <Route exact path={routes.MM0502} component={MM0502} />
                <Route exact path={routes.MM0503} component={MM0503} />

                {/* MM06 서버/개발 관리 */}
                <Route exact path={routes.MM0601} component={MM0601} />
                <Route exact path={routes.MM0602} component={MM0602} />
                <Route exact path={routes.MM0603} component={MM0603} />

                {/* MM07 클라이언트 관리 */}
                <Route exact path={routes.MM0701} component={MM0701} />
              </div>
            </>
          ) : (
            <LoginBox action={this._loginHandler} />
          )}
        </div>

        <div className="sys__footer">
          <a
            href="https://www.4leaf-dev.com/"
            target="_blank"
            className="ft-logo"
          ></a>
          <div className="ft-copyright darkgray">
            <p>[35270] 대전 서구 계룡로394번길 14-14</p>
            <p>COPYRIGHT ©2020 ALL RIGHTS RESERVED 4LEAF SOFTWARE</p>
          </div>
          <div className="ft-info">
            <a href="https://www.instagram.com/4leaf_dev/" target="_blank">
              <IconComponent iconName="fab fa-instagram" />
            </a>
          </div>
        </div>
      </div>
    );
  }

  _aleadyLogined = () => {
    this.setState({
      loginStatus: true
    });
  };

  _loginHandler = async () => {
    const inputId = document.getElementById("inputId").value;
    const inputPass = document.getElementById("inputPass").value;

    if (inputId.length < 1 || inputPass.length < 1) {
      return;
    }

    const response = await fetch("/api/loginProcess", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ inputId, inputPass })
    });

    const data = await response.json();

    await sessionStorage.setItem("login_id", data.empId);
    await sessionStorage.setItem("login_name", data.name);
    await sessionStorage.setItem("login_rank", data.rank);
    await sessionStorage.setItem("login_avatar", data.avatar);

    if (sessionStorage.getItem("login_id") === "undefined") {
      sessionStorage.clear();

      return;
    }

    this.setState({
      loginStatus: data.loginResult
    });
  };

  _logoutHandler = () => {
    sessionStorage.clear();

    this.setState({
      loginStatus: false
    });
  };

  _searchClickHandler = () => {
    const txtBox = document.getElementById("search__txt-js");

    txtBox.classList.toggle("fadeIn");
  };
}

export default App;
