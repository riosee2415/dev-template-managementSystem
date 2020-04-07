import React from "react";

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
          <button>업무내용</button>
        </li>

        <li>
          {this.props.result === "0" ? (
            <button>개발중</button>
          ) : (
            <div>개발완료</div>
          )}
        </li>

        <li>
          <button>업무삭제</button>
        </li>
      </ul>
    );
  }
}

export default WorkList;
