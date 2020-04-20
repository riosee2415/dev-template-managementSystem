import React from "react";
import IconComponent from "../../components/material/IconComponent";
import FixedHeaderTable from "../../components/material/FixedHeaderTable";

class MM0401 extends React.Component {
  render() {
    return (
      <div>
        <div className="mm">
          <div className="mm__header mh">
            <div className="mh__content">
              <div className="mh__content__title">
                <IconComponent iconName="fas fa-leaf" />
                <span>커뮤니티 > 공지사항</span>
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
                <span>
                  <input
                    type="button"
                    className="btn btn-xs bg-blue"
                    value="작성"
                  />
                </span>
              </div>
            </div>
          </div>

          <div className="mm__content mc">
            <div className="mc__col2">
              <div className="mc__col2__title">
                <IconComponent iconName="fas fa-clipboard-list" />
                <span className="subTitle">공지사항</span>
              </div>
              <FixedHeaderTable />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MM0401;
