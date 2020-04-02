import React from "react";
import IconComponent from "../../components/IconComponent";
import LeftListBox from "../../components/LeftListBox";

class MM0103 extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectCollection: "employee"
    };
  }

  componentDidMount() {}

  render() {
    const { selectCollection } = this.state;

    return (
      <>
        <div className="mm">
          <div className="mm__header mh">
            <div className="mh__content">
              <div className="mh__content__title">
                <IconComponent iconName="fas fa-play" />
                <span>title</span>
              </div>
            </div>
          </div>
          <div className="mm__content mc">
            <div className="mc__col1">
              <div className="mc__col1__title">
                <IconComponent iconName="fas fa-play" />
                <span classsName="subTitle">title</span>
              </div>
              <div className="mc__col1__desc">
                <LeftListBox
                  title_01="제목1"
                  title_02="제목2"
                  title_03="제목3"
                  table={selectCollection}
                />
              </div>
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
      </>
    );
  }

  _initHandler = () => {
    const test_data = [];

    test_data.push({ data1: "데이터1", data2: "데이터2", data3: "데이터3" });
    test_data.push({ data1: "데이터1", data2: "데이터2", data3: "데이터3" });
  };
}

export default MM0103;
