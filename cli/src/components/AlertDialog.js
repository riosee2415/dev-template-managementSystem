import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Alert, AlertTitle } from "@material-ui/lab";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    "& > * + *": {
      marginTop: theme.spacing(2),
    },
  },

  dialogContent: {
    width: 500,
  },
}));

export default function AlertDialog(props) {
  const classes = useStyles();

  const [open, setOpen] = React.useState(props.isOpen);

  const handleClose = () => {
    props.closeDialogHandler();
    setOpen(false);
  };

  return (
    <Dialog open={open}>
      <DialogContent className={classes.dialogContent}>
        <div className={classes.root}>
          <Alert severity={props.type} className={classes.alert}>
            <AlertTitle>{props.title}</AlertTitle>
            {props.content}
          </Alert>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          확인
        </Button>
      </DialogActions>
    </Dialog>
  );
}
