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

    return (
      <>
        {this.props.tabs ? (
          <Paper style={{ margin: 10 }}>
            <Tabs
              value={this.props.selectedTab - 1}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              {this.props.tabs.map((tab, idx) => {
                return (
                  <Tab
                    key={idx}
                    label={tab.label}
                    onClick={() =>
                      tab.action(tab.param1, tab.param2, tab.param3, tab.param4)
                    }
                  />
                );
              })}
            </Tabs>
          </Paper>
        ) : null}
      </>
    );
  }
}

export default withStyles(styles)(TabBox);
