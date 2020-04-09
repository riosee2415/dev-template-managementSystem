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
      .then((res) => {
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
          useyn: res.data().useyn,
        };
      });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return req.body.isController ? sendData : res.json(sendData);
};

const removeEmpInfo = async (req, res) => {
  const empInfo = req.body.empInfo;

  let fsRef;
  let queryRef;
  let sendData = {
    result: false,
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

const MM0103Controller = {
  getEmpInfo,
  removeEmpInfo,
};

export default MM0103Controller;
