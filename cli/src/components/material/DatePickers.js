import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers({ lab, dateId, changed = null }) {
  const classes = useStyles();

  const date = new Date();
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  m = m < 10 ? "0" + m : m;
  d = d < 10 ? "0" + d : d;

  const currentDate = y + "-" + m + "-" + d;

  return (
    <form className={classes.container} noValidate>
      <TextField
        id={dateId}
        label={lab}
        type="date"
        defaultValue={currentDate}
        className={classes.textField}
        onChange={changed}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
