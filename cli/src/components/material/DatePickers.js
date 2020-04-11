import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles(theme => ({
  root: {
    width: 200
  }
}));

export default function DatePickers(props) {
  const classes = useStyles();

  const date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;

  const currentDate = y + "-" + m + "-" + d;

  return (
    <TextField
      className={classes.root}
      type="date"
      margin="dense"
      defaultValue={currentDate}
      InputLabelProps={{
        shrink: true
      }}
      {...props}
    />
  );
}
