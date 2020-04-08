import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: 250,
    },
  },
}));

export default function OutlinedButtonHalf({
  text,
  color,
  action,
  isDisabled = false,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Button
        color={color}
        variant="outlined"
        disabled={isDisabled}
        onClick={action}
      >
        {text}
      </Button>

      {/* <Button variant="outlined" color="primary">
      {text}
      </Button>
      <Button variant="outlined" color="secondary">
      {text}
      </Button>
      <Button variant="outlined" disabled>
       {text}
      </Button>
      <Button variant="outlined" color="primary" href="#outlined-buttons">
      {text}
      </Button> */}
    </div>
  );
}