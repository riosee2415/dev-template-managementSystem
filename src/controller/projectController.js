import firestore from "../firebase";

const getProjectInfo = async (key) => {
  console.log(key);

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

const projectController = {
  getProjectInfo,
};

export default projectController;
