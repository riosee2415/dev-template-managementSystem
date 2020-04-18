import firestore from "../../firebase";

const getEmpInfo = async (req, res) => {
  const key = req.body.key;

  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef
      .doc(key)
      .get()
      .then(res => {
        sendData = {
          docId: res.id,
          empId: res.data().empId,
          name: res.data().name,
          rank: res.data().rank,
          position: res.data().position,
          avatar:
            "https://s3.ap-northeast-2.amazonaws.com/management-system.4leaf/" +
            res.data().avatar,
          addr1: res.data().addr1,
          addr2: res.data().addr2,
          birthday: res.data().birthday,
          hire: res.data().hire,
          loc: res.data().loc,
          zoneCode: res.data().zoneCode,
          mobile: res.data().mobile,
          email: res.data().email,
          empNo: res.data().empNo,
          dept: res.data().dept,
          useyn: res.data().useyn
        };
      });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return req.body.isController ? sendData : res.json(sendData);
};

const getTotalEmpList = async (req, res) => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef.get().then(res => {
      res.forEach(doc => {
        sendData.push({
          docId: doc.id,
          empId: doc.data().empId,
          name: doc.data().name,
          rank: doc.data().rank,
          position: doc.data().position,
          avatar:
            "https://s3.ap-northeast-2.amazonaws.com/management-system.4leaf/" +
            doc.data().avatar,
          addr1: doc.data().addr1,
          addr2: doc.data().addr2,
          birthday: doc.data().birthday,
          hire: doc.data().hire,
          loc: doc.data().loc,
          zoneCode: doc.data().zoneCode,
          mobile: doc.data().mobile,
          email: doc.data().email,
          empNo: doc.data().empNo,
          dept: doc.data().dept,
          useyn: doc.data().useyn
        });
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return req.body.isController ? sendData : res.json(sendData);
};

const addEmpInfo = async (req, res) => {
  const data = JSON.parse(req.body.data);
  const profileFile = req.file;

  let fsRef;
  let queryRef;
  let sendData = {
    empId: data.empId,
    password: data.password,
    empNo: getEmpNo(req, res),
    name: data.name,
    loc: data.loc,
    dept: data.dept,
    position: data.position,
    rank: data.rank,
    hire: data.hire,
    birthday: data.birthday,
    mobile: data.mobile,
    email: data.email,
    addr1: data.addr1,
    addr2: data.addr2,
    zoneCode: data.zoneCode,
    useyn: data.useyn,
    avatar: `uploads/${req.body.uploadPath}/${req.body.uploadTime}_${profileFile.originalname}`
  };

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef.add(sendData);
  } catch (e) {
    console.log(e);
  } finally {
    fsRef = null;
  }

  return null;
};

const modifyEmpInfo = async (req, res) => {
  const data = req.body.data;

  let fsRef;
  let queryRef;
  let sendData = {
    password: data.password,
    empNo: data.empNo,
    name: data.name,
    loc: data.loc,
    dept: data.dept,
    position: data.position,
    rank: data.rank,
    avatar: data.avatar,
    birthday: data.birthday,
    mobile: data.mobile,
    email: data.email,
    addr1: data.addr1,
    addr2: data.addr2,
    zoneCode: data.zoneCode
  };

  try {
    fsRef = await firestore.collection("employee").doc(data.key);

    queryRef = await fsRef.update(sendData);
  } catch (e) {
    console.log(e);
  } finally {
    fsRef = null;
  }

  return null;
};

const removeEmpInfo = async (req, res) => {
  const empInfo = req.body.empInfo;

  let fsRef;
  let queryRef;
  let sendData = {
    result: false
  };

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef
      .doc(empInfo.docId)
      .update({ useyn: "n" })
      .then(() => {
        sendData.result = true;
      });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return res.json(sendData);
};

const getEmpIdCheck = async (req, res) => {
  const key = req.body.key;

  let fsRef;
  let queryRef;
  let sendData = {
    result: true
  };
  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef.where("empId", "==", key);

    await queryRef.get().then(res => {
      res.forEach(doc => {
        sendData.result = false;
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return res.json(sendData);
};

const getEmpNo = async (req, res) => {
  const data = JSON.parse(req.body.data);

  let dept_code;
  if (data.dept == "솔루션개발팀") dept_code = "SD";
  else if (data.dept == "정보화사업개발팀") dept_code = "ID";

  const year = new Date().getFullYear();

  req.body.isController = true;

  const sendData = getTotalEmpList(req, res);
  const numbers = new Array();
  sendData.map(data => {
    numbers.push(parseInt(data.empNo.substring(6, 10)));
  });
  numbers = numbers.sort();

  const number = numbers[numbers.length - 1] + 1;
  const util = require("util");
  number = util.format("%4d", number);

  console.log(numbers);
  console.log(number);
  return dept_code + year + number;
};

const MM0103Controller = {
  getEmpInfo,
  getTotalEmpList,
  addEmpInfo,
  modifyEmpInfo,
  removeEmpInfo,
  getEmpIdCheck
};

export default MM0103Controller;
