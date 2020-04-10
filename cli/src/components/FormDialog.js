import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = {};

class FormDialog extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Dialog
        open={this.props.isOpen}
        aria-labelledby="form-dialog-title"
        fullWidth={true}
        maxWidth="md"
      >
        <DialogTitle id="form-dialog-title">{this.props.title}</DialogTitle>
        <DialogContent>{this.props.children}</DialogContent>
        <DialogActions>
          {this.props.isOnlyCheck ? (
            <Button onClick={this.props.closeDialogHandler} color="primary">
              닫기
            </Button>
          ) : (
            <>
              <Button onClick={this.props.submitDialogHandler} color="primary">
                {this.props.isModified ? <span>변경</span> : <span>등록</span>}
              </Button>
              <Button onClick={this.props.closeDialogHandler} color="primary">
                취소
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(FormDialog);
