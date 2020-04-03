const firestore = require("../firebase");

const saveWorkTimeToStart = async data => {
  let fsRef;
  let queryRef;
  let sendData = {
    date: data.inputDate,
    id: data.id,
    startTime: data.inputStartTime,
    endTime: "00:00:00"
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

const getWorkTime = async inputData => {
  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("workRecord");

    queryRef = await fsRef
      .where("id", "==", inputData.id)
      .where("date", "==", inputData.date)
      .get()
      .then(res => {
        res.forEach(doc => {
          sendData = {
            startTime: doc.data().startTime,
            endTime: doc.data().endTime,
            id: doc.id
          };
        });
      });
  } catch (e) {
    console.log(e);
  }

  return sendData;
};

const saveWorkTimeToEnd = async inputData => {
  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("workRecord");

    await fsRef.doc(inputData.fsId).update({
      endTime: inputData.inputEndTime
    });
  } catch (e) {
    console.log(e);
  }

  return sendData;
};

const apiControllerWork = {
  saveWorkTimeToStart,
  getWorkTime,
  saveWorkTimeToEnd
};

module.exports = apiControllerWork;
