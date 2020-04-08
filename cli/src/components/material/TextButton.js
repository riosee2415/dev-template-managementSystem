import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(-1),
    },
  },
}));

export default function TextButton({
  text,
  color,
  action,
  isDisabled = false,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button disabled={isDisabled} onClick={action} color={color}>
        {text}
      </Button>
      {/* <Button color="primary">{text}</Button>
      <Button color="secondary">{text}</Button>
      <Button disabled>{text}</Button> */}
    </div>
  );
}
