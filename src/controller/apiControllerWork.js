const firestore = require("../firebase");

const saveWorkTimeToStart = async data => {
  let fsRef;
  let queryRef;
  let sendData = {
    date: data.inputDate,
    id: data.id,
    startTime: data.inputStartTime
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
            endTime: doc.data().endTime
          };
        });
      });
  } catch (e) {
    console.log(e);
  }

  return sendData;
};

const apiControllerWork = {
  saveWorkTimeToStart,
  getWorkTime
};

module.exports = apiControllerWork;
