import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export default function FormDialog2(props) {
  return (
    <Dialog
      open={props.open}
      aria-labelledby="form-dialog-title"
      fullWidth={true}
      maxWidth="md"
    >
      <DialogTitle id="form-dialog-title">{props.title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.content}</DialogContentText>
        {props.children}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialogHandler} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
}
