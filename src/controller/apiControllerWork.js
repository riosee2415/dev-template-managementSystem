import firestore from "../firebase";

const saveWorkTimeToStart = async (data) => {
  const date = new Date();

  let fsRef;
  let queryRef;
  let sendData = {
    date: data.inputDate,
    id: data.id,
    startTime: data.inputStartTime,
    endTime: "00:00:00",
    idx: date.getDate(),
  };

  try {
    fsRef = await firestore.collection("workRecord");

    queryRef = await fsRef.add(sendData);
  } catch (e) {
    console.log(e);
  } finally {
  }

  return null;
};

const getWorkTime = async (inputData) => {
  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("workRecord");

    queryRef = await fsRef
      .where("id", "==", inputData.id)
      .where("date", "==", inputData.date)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          sendData = {
            startTime: doc.data().startTime,
            endTime: doc.data().endTime,
            id: doc.id,
          };
        });
      });
  } catch (e) {
    console.log(e);
  }

  return sendData;
};

const saveWorkTimeToEnd = async (inputData) => {
  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("workRecord");

    await fsRef.doc(inputData.fsId).update({
      endTime: inputData.inputEndTime,
    });
  } catch (e) {
    console.log(e);
  }

  return sendData;
};

const getDetailDataToWorkTime = async (inputData) => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("workRecord");

    await fsRef
      .where("id", "==", inputData.inputId)
      .limit(5)
      .get()
      .then((res) => {
        res.forEach((doc) => {
          sendData.push({
            date: doc.data().date,
            startTime: doc.data().startTime,
            endTime: doc.data().endTime,
          });
        });
      });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const apiControllerWork = {
  saveWorkTimeToStart,
  getWorkTime,
  saveWorkTimeToEnd,
  getDetailDataToWorkTime,
};

module.exports = apiControllerWork;
