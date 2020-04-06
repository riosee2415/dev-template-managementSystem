import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import { Alert, AlertTitle } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2)
    }
  },
  alertStyle: {
    width: 500
  }
}));

export default function AlertDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(props.isOpen);

  console.log(open, props.isOpen);
  const handleClose = () => {
    props.closeDialogHandler();
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogContent className={classes.alertStyle}>
          <div className={classes.root}>
            <Alert severity={props.type}>
              <AlertTitle>{props.title}</AlertTitle>
              {props.msg}
            </Alert>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            확인
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
