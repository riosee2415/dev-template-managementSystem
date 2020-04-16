import React from "react";
import axios from "axios";

class MM0201 extends React.Component {
  render() {
    return (
      <div>
        <form onSubmit={this._sendHandler} enctype="multipart/form-data">
          <input type="file" name="file" id="file" />
          <input type="submit" value="제발" />
        </form>
      </div>
    );
  }

  _sendHandler = async (e) => {
    e.preventDefault();

    const file = document.getElementById("file");
    const fileData = file.files[0];

    const data = new FormData();
    data.append("file", fileData);
    data.append("filename", fileData.name);

    console.log(data);

    axios
      .post("/api/fileTest", data)
      .then(function (response) {
        console.log(response); // 옆과 같이 response를 로그를 찍어볼수 있습니다. 여기서 setState등의 작업        을 통해 aws s3 에 올라간 이미지 정보를 저장할 수 있다.
      })
      .catch(function (error) {
        console.log(error);
      });
  };
}

export default MM0201;
