import React from "react";
import OutlinedButton from "../material/OutlinedButton";
import IconComponent from "../material/IconComponent";
import FormDialog from "../material/FormDialog";
import { withStyles } from "@material-ui/core/styles";

const styles = {
  workDes: { lineHeight: 1.5 }
};

class WorkList extends React.Component {
  state = {
    isDescFormOpen: false
  };

  render() {
    const { classes } = this.props;
    const { isDescFormOpen } = this.state;

    return (
      <>
        <ul className="workList-main" key={this.props.workRef}>
          <li>{this.props.idx}</li>
          <li>{this.props.workName}</li>
          <li>{this.props.workCode}</li>
          <li>{this.props.workType}</li>
          <li>{this.props.workEmp}</li>
          <li>{this.props.workDate}</li>

          <li>
            <button
              className="btn btn-s bg-violet"
              onClick={() => this._descViewHandler()}
            >
              내용
            </button>
          </li>

          <li>
            {this.props.result === "0" ? (
              <OutlinedButton
                text="개발중"
                color="secondary"
                action={() => this.props.changeStatus(this.props.workRef)}
              />
            ) : (
              <OutlinedButton text="개발완료" isDisabled={true} />
            )}
          </li>

          <li>
            <button onClick={() => this.props.delConfirm(this.props.workRef)}>
              <IconComponent iconName="far fa-times-circle" />
            </button>
          </li>
        </ul>

        {isDescFormOpen ? (
          <FormDialog
            isOpen={isDescFormOpen}
            title="업무상세 내용"
            content=""
            closeDialogHandler={this._descFormCloseDialogHandler}
            isOnlyCheck={true}
          >
            <div className={classes.workDes}>{this.props.workDesc}</div>
          </FormDialog>
        ) : null}
      </>
    );
  }

  _descFormCloseDialogHandler = () => {
    this.setState({
      isDescFormOpen: false
    });
  };

  _descViewHandler = () => {
    this.setState({
      isDescFormOpen: true
    });
  };
}

export default withStyles(styles)(WorkList);
