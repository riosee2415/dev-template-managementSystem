import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TextField
} from "@material-ui/core";

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
