import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";

export default function FormDialog(props) {
  return (
    <Dialog open={props.open} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.submitDialogHandler} color="primary">
          등록
        </Button>
        <Button onClick={props.closeDialogHandler} color="primary">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
}
