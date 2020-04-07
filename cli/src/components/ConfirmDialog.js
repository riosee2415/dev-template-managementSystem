import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

export default function ConfirmDialog(props) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="confirmation-dialog-title"
      disableBackdropClick
      disableEscapeKeyDown
      fullWidth={true}
      maxWidth="sm"
    >
      <DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{props.content}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={props.submitDialogHandler} color="primary">
          확인
        </Button>
        <Button onClick={props.closeDialogHandler} color="primary">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
