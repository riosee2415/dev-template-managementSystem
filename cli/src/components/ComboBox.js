import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

export default function ComboBox({ dataList, title, txtId }) {
  return (
    <Autocomplete
      id={txtId}
      blurOnSelect
      options={dataList}
      getOptionLabel={(option) => option.title}
      style={{ width: 300, marginRight: 50 }}
      renderInput={(params) => (
        <TextField {...params} label={title} variant="outlined" />
      )}
    />
  );
}
