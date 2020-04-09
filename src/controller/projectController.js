import firestore from "../firebase";

const getProjectInfo = async (key) => {
  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("progress_projects");

    queryRef = await fsRef
      .doc(key)
      .get()
      .then((res) => {
        sendData = {
          ref: res.id,
          PM: res.data().PM,
          clientRef: res.data().clientRef,
          contactFile: res.data().contactFile,
          endDate: res.data().endDate,
          estimateFile: res.data().estimateFile,
          exDate: res.data().exDate,
          insDate: res.data().insDate,
          name: res.data().name,
          profit: res.data().profit,
          progress: res.data().progress,
          startDate: res.data().startDate,
          type: res.data().type,
        };
      });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const getProjectWorkListInfo = async (key) => {
  let fsRef;
  let fsRef2;
  let queryRef;
  let sendData = [];

  let workName = "";

  try {
    fsRef = await firestore.collection("progress_projects").doc(key);
    fsRef2 = await firestore.collection("employee");

    await fsRef
      .collection("workList")
      .orderBy("workDate", "asc")
      .get()
      .then((res) => {
        res.forEach((doc) => {
          sendData.push({
            workRef: doc.id,
            result: doc.data().result,
            workCode: doc.data().workCode,
            workDate: doc.data().workDate,
            workDesc: doc.data().workDesc,
            workEmp: doc.data().workEmp,
            workName: doc.data().workName,
            workType: doc.data().workType,
          });
        });
      });

    fsRef = null;
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const getEmpList = async () => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("employee");

    await fsRef.get().then((res) => {
      res.forEach((doc) => {
        sendData.push({
          title: doc.data().name,
        });
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const addWorkList = async (addData) => {
  let fsRef;
  let queryRef;
  let sendData = {
    result: addData.result,
    workCode: addData.workCode,
    workDate: addData.workDate,
    workDesc: addData.workDesc,
    workEmp: addData.workEmp,
    workType: addData.workType,
    workName: addData.workName,
  };

  try {
    fsRef = await firestore.collection("progress_projects").doc(addData.key);

    await fsRef.collection("workList").add(sendData);
  } catch (e) {
    console.log(e);
  } finally {
  }

  return null;
};

const deleteWorkList = async (req, res) => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore
      .collection("progress_projects")
      .doc(req.body.parentKey);

    await fsRef.collection("workList").doc(req.body.workRef).delete();
  } catch (e) {
    console.log(e);
  } finally {
  }

  return null;
};

const chagneStatus = async (req, res) => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore
      .collection("progress_projects")
      .doc(req.body.parentKey);

    await fsRef.collection("workList").doc(req.body.workRef).update({
      result: "1",
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return null;
};

const projectController = {
  getProjectInfo,
  getProjectWorkListInfo,
  getEmpList,
  addWorkList,
  deleteWorkList,
  chagneStatus,
};

export default projectController;
