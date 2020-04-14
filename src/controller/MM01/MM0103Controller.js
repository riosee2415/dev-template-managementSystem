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
          avatar: res.data().avatar,
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

const addEmpInfo = async (req, res) => {
  console.log(req);
  const profile_file = req.file;
  console.log(profile_file);
  return;
  const data = req.body.data;

  let fsRef;
  let queryRef;
  let sendData = {
    empId: data.empId,
    password: data.password,
    empNo: data.empNo,
    name: data.name,
    loc: data.loc,
    dept: data.dept,
    position: data.position,
    rank: data.rank,
    hire: data.hire,
    avatar: data.avatar,
    birthday: data.birthday,
    mobile: data.mobile,
    email: data.email,
    addr1: data.addr1,
    addr2: data.addr2,
    zoneCode: data.zoneCode,
    useyn: data.useyn
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

const MM0103Controller = {
  getEmpInfo,
  addEmpInfo,
  modifyEmpInfo,
  removeEmpInfo,
  getEmpIdCheck
};

export default MM0103Controller;
