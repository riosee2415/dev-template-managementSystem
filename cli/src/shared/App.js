import React from "react";
import { Route } from "react-router-dom";
import { Home, Commute, Board } from "../pages";
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
        <div className="sys__header"></div>

        <div className="sys__main">
          {loginStatus ? (
            <>
              <div className="sys__menu">
                <Menu />
              </div>
              <div className="sys__content">
                <Route exact path={routes.HOME} component={Home} />
                <Route path={routes.COMMUTE} component={Commute} />
                <Route path={routes.BOARD} component={Board} />
              </div>
            </>
          ) : (
            <input
              type="button"
              value="LOGIN"
              onClick={() => this._loginHandler()}
            />
          )}
        </div>

        <div className="sys__footer">FOOTER</div>
      </div>
    );
  }

  _loginHandler = () => {
    this.setState({
      loginStatus: true
    });
  };
}

export default App;
