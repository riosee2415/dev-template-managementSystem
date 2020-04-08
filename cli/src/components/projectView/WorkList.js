import React from "react";
import OutlinedButton from "../../components/material/OutlinedButton";
import IconComponent from "../IconComponent";

class WorkList extends React.Component {
  render() {
    return (
      <ul className="workList-main" key={this.props.idx}>
        <li>{this.props.idx}</li>
        <li>{this.props.workName}</li>
        <li>{this.props.workCode}</li>
        <li>{this.props.workType}</li>
        <li>{this.props.workEmp}</li>
        <li>{this.props.workDate}</li>

        <li>
          <button className="btn btn-s bg-violet">내용</button>
        </li>

        <li>
          {this.props.result === "0" ? (
            <OutlinedButton text="개발중" color="secondary" />
          ) : (
            <OutlinedButton text="개발완료" isDisabled={true} />
          )}
        </li>

        <li>
          <IconComponent iconName="far fa-times-circle" />
        </li>
      </ul>
    );
  }
}

export default WorkList;
