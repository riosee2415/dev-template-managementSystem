import React from "react";
import "../../styles/common.css";
import IconComponent from "../../components/IconComponent";

class MM0101 extends React.Component {
  render() {
    return (
      <div className="mm">
        <div className="mm__header mh">
          <div className="mh__content">
            <IconComponent iconName="fas fa-play" />
            <span>title</span>
          </div>
        </div>

        <div className="mm__content mc">
          <div className="mc__col1">
            <div className="mc__col1__title">
              <IconComponent iconName="fas fa-play" />
              <span classsName="subTitle">title</span>
            </div>
            <div className="mc__col1__desc">desc</div>
          </div>
          <div className="mc__col2">
            <div className="mc__col2__title">
              <IconComponent iconName="fas fa-play" />
              <span classsName="subTitle">title</span>
            </div>
            <div className="mc__col2__desc">desc</div>
          </div>
        </div>
      </div>
    );
  }
}

export default MM0101;
