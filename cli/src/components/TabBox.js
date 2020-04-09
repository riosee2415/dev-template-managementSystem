import React from "react";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class TabBox extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedTab: this.props.selectedTab
    };
  }

  render() {
    const { classes } = this.props;
    const { selectedTab } = this.state;

    return (
      <>
        {this.props.tabs ? (
          <Paper>
            <Tabs
              value={selectedTab - 1}
              onChange={this._tabChangeHandler}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              {this.props.tabs.map((tab, idx) => {
                return <Tab key={idx} label={tab} />;
              })}
            </Tabs>
          </Paper>
        ) : null}
      </>
    );
  }

  _tabChangeHandler = (event, newValue) => {
    this.props.tabChangeHandler(newValue + 1);
    this.setState({
      selectedTab: newValue + 1
    });
  };
}

export default withStyles(styles)(TabBox);
