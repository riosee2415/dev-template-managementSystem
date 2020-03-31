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

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loginStatus: false
    };
  }

  render() {
    const { loginStatus } = this.state;

    return (
      <div className="sys">
        <div className="sys__header">
          <div className="hd-logo"></div>
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

        <div className="sys__footer">FOOTER</div>
      </div>
    );
  }

  _loginHandler = async () => {
    const loginFrm = document.getElementById("loginFrm-js");

    const response = await fetch("/api/loginProcess");
    const body = await response.json();

    this.setState({
      loginStatus: body.loginFlag
    });
  };
}

export default App;
