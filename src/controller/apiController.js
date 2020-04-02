const firestore = require("../firebase");

const loginProcess = async (id, pass) => {
  let fsRef;
  let queryRef;
  let sendData = {
    loginResult: false
  };

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef
      .where("empId", "==", id)
      .where("password", "==", pass);

    await queryRef.get().then(res => {
      res.forEach(doc => {
        sendData = {
          empId: doc.data().empId,
          name: doc.data().name,
          rank: doc.data().rank,
          avatar: doc.data().avatar,
          loginResult: true
        };
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const callCollection = async collectionData => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection(collectionData);

    queryRef = await fsRef.get().then(res => {
      res.forEach(doc => {
        sendData.push({
          name: doc.data().name,
          rank: doc.data().rank
        });
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const apiController = {
  loginProcess,
  callCollection
};

module.exports = apiController;
