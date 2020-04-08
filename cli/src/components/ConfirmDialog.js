import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class ConfirmDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.isOpen}
        aria-labelledby="confirmation-dialog-title"
        disableBackdropClick
        disableEscapeKeyDown
        fullWidth={true}
        maxWidth="sm"
      >
        <DialogTitle id="confirmation-dialog-title">
          {this.props.title}
        </DialogTitle>
        <DialogContent dividers>
          <DialogContentText>{this.props.content}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={this.props.submitDialogHandler}
            color="primary"
          >
            확인
          </Button>
          <Button onClick={this.props.closeDialogHandler} color="primary">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ConfirmDialog);
