import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class AlertDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog open={this.props.isOpen} fullWidth maxWidth="xs">
        <DialogContent>
          <Alert severity={this.props.type}>
            <AlertTitle>{this.props.title}</AlertTitle>
            {this.props.content}
          </Alert>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.props.closeDialogHandler} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(AlertDialog);
