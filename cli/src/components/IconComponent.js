import React from "react";
import { loadCSS } from "fg-loadcss";
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";

const useStyles = makeStyles(theme => ({
  root: {
    "& > .fa": {
      margin: theme.spacing(2)
    }
  }
}));

export default function IconComponent({ iconName }) {
  const classes = useStyles();

  React.useEffect(() => {
    loadCSS(
      "https://use.fontawesome.com/releases/v5.12.0/css/all.css",
      document.querySelector("#font-awesome-css")
    );
  }, []);

  return (
    <div className={classes.root}>
      <Icon className={iconName} color="action" />
    </div>
  );
}
