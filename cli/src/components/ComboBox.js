import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(-1),
      width: "200%",
      marginBottom: 40,
    },
  },
}));

export default function ComboBox({ dataList, title, txtId }) {
  const classes = useStyles();
  return (
    <Autocomplete
      className={classes.root}
      id={txtId}
      blurOnSelect
      options={dataList}
      getOptionLabel={(option) => option.title}
      style={{
        marginLeft: -10,
        marginBottom: 20,
        width: 250,
        marginRight: 20,
        height: 40,
      }}
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" />
      )}
    />
  );
}
