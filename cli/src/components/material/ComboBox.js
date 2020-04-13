import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(1)
  }
}));

export default function ComboBox(props) {
  const classes = useStyles();

  return (
    <Autocomplete
      className={classes.root}
      getOptionLabel={option => option.title}
      renderInput={params => (
        <TextField
          {...params}
          label={props.label}
          variant="outlined"
          InputLabelProps={props.InputLabelProps}
        />
      )}
      blurOnSelect
      noOptionsText="없음"
      {...props}
    />
  );
}
