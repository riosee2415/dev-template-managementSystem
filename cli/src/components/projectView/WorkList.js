import React from "react";
import TextButton from "../../components/material/TextButton";

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
          <button className="btn btn-m bg-violet">업무내용</button>
        </li>

        <li>
          {this.props.result === "0" ? (
            <TextButton text="개발중" color="secondary" />
          ) : (
            <TextButton text="개발완료" isDisabled={true} />
          )}
        </li>

        <li>
          <button className="btn btn-m bg-pink">업무삭제</button>
        </li>
      </ul>
    );
  }
}

export default WorkList;
