import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import DaumPostcode from "react-daum-postcode";

const Postcode = props => {
  const _completeHandler = data => {
    let fullAddress = data.address;
    let extraAddress = "";

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
    }
    props.closeDialogHandler();

    const zoneCode = document.getElementById("zoneCode-js");
    const addr1 = document.getElementById("addr1-js");
    const addr2 = document.getElementById("addr2-js");

    zoneCode.value = data.zonecode;
    addr1.value = fullAddress;
    addr2.focus();
  };

  return (
    <Dialog open={true} fullWidth maxWidth="sm">
      <DialogContent>
        <DaumPostcode
          onComplete={_completeHandler}
          autoClose={true}
          animation={true}
          {...props}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.closeDialogHandler} color="primary">
          닫기
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Postcode;
