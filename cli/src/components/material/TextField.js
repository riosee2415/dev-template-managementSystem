import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  }
}));

export default function TextFiled(props) {
  const classes = useStyles();

  return <TextField className={classes.root} {...props} />;
}
