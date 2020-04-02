import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";

class MM0103 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pageCode: "MM0103",
      selectCollection: "employee"
    };
  }

  render() {
    const { pageCode, selectCollection } = this.state;

    return (
      <>
        <div className="mm">
          <div className="mm__header mh">
            <div className="mh__content">
              <div className="mh__content__title">
                <IconComponent iconName="fas fa-leaf" />
                <span>인사 관리 > 출퇴근 관리</span>
              </div>
            </div>
          </div>
          <div className="mm__content mc">
            <div className="mc__col1">
              <div className="mc__col1__title">
                <IconComponent iconName="fas fa-list-ul" />
                <span className="subTitle">직원 목록</span>
              </div>
              <div className="mc__col1__desc">
                <LeftListBox
                  title_01="번호"
                  title_02="직원명"
                  title_03="직급"
                  pageCode={pageCode}
                  collection={selectCollection}
                />
              </div>
            </div>
            <div className="mc__col2">
              <div className="mc__col2__title">
                <IconComponent iconName="fas fa-play" />
                <span className="subTitle">직원 정보</span>
              </div>
              <div className="mc__col2__desc">desc</div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default MM0103;
