import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";
import TopArea from "../../components/projectView/TopArea";

class MM0202 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0202",
      selectCollection: ["progress_projects"],
      projectInfo: null,
      isLeftRefresh: false
    };
  }

  render() {
    const {
      pageCode,
      selectCollection,
      isLeftRefresh,
      projectInfo
    } = this.state;

    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <div className="mh__content__title">
              <IconComponent iconName="fas fa-leaf" />
              <span>프로젝트 관리 > 진행 프로젝트</span>
            </div>
            <div className="mh__content__btn">
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-blue"
                  value="추가"
                />
              </span>
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-blue"
                  value="수정"
                />
              </span>
              <span>
                <input
                  type="button"
                  className="btn btn-xs bg-pink"
                  value="삭제"
                />
              </span>
            </div>
          </div>
        </div>

        <div className="mm__content mc">
          <div className="mc__col1">
            <div className="mc__col1__title">
              <IconComponent iconName="fas fa-list-ul" />
              <span className="subTitle">프로젝트 리스트</span>
            </div>
            <div className="mc__col1__desc">
              <LeftListBox
                title_01="번호"
                title_02="프로젝트명"
                title_03="유형"
                pageCode={pageCode}
                collections={selectCollection}
                dataClickHandler={this._dataClickHandler}
                isRefresh={isLeftRefresh}
              />
            </div>
          </div>
          <div className="mc__col2">
            <div className="mc__col2__title">
              <IconComponent iconName="fas fa-file-alt" />
              <span className="subTitle">상세정보</span>
            </div>
            <div className="mc__col2__desc">
              <div className="project-info-main">
                {projectInfo ? (
                  <>
                    <TopArea
                      projectRef={projectInfo.ref}
                      PM={projectInfo.PM}
                      clientRef={projectInfo.clientRef}
                      contactFile={projectInfo.contactFile}
                      endDate={projectInfo.endDate}
                      estimateFile={projectInfo.estimateFile}
                      exDate={projectInfo.exDate}
                      insDate={projectInfo.insDate}
                      name={projectInfo.name}
                      profit={projectInfo.profit}
                      progress={projectInfo.progress}
                      startDate={projectInfo.startDate}
                      type={projectInfo.type}
                    />
                    <div className="mc__col2__desc__btnArea">
                      <button>거래처정보</button>
                      <button>진행률{projectInfo.progress}</button>
                    </div>
                  </>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  _dataClickHandler = async key => {
    const response = await fetch("/api/getProjectInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({ key })
    });
    const data = await response.json();
    this.setState({
      projectInfo: data
    });
  };
}

export default MM0202;
