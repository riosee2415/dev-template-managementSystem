import React from "react";

class TopArea extends React.Component {
  render() {
    return (
      <div className="project-info">
        <div className="project-info__box">
          <div>프로젝트 이름</div>
          <div>{this.props.name}</div>

          <div>프로젝트 수익</div>
          <div>{this.props.profit}</div>

          <div></div>
          <div></div>
        </div>

        <div className="project-info__box">
          <div>시작일</div>
          <div>{this.props.startDate}</div>

          <div>종료일</div>
          <div>{this.props.endDate}</div>

          <div>연장일</div>
          <div>{this.props.exDate}</div>
        </div>

        <div className="project-info__box">
          <div>프로젝트 유형</div>
          <div>{this.props.type}</div>

          <div>프로젝트 매니저</div>
          <div>{this.props.PM}</div>

          <div></div>
          <div></div>
        </div>

        <div className="saperator-line"></div>
      </div>
    );
  }
}

export default TopArea;
