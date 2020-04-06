import firestore from "../firebase";

const loginProcess = async (id, pass) => {
  let fsRef;
  let queryRef;
  let sendData = {
    loginResult: false,
  };

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef
      .where("empId", "==", id)
      .where("password", "==", pass);

    await queryRef.get().then((res) => {
      res.forEach((doc) => {
        sendData = {
          empId: doc.data().empId,
          name: doc.data().name,
          rank: doc.data().rank,
          avatar: doc.data().avatar,
          loginResult: true,
        };
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const callCollection = async (pageCode, collections) => {
  let fsRef;
  let queryRef;
  let sendData = [];
  let collectionIdx = 0;

  try {
    if (pageCode === "MM0102") {
      fsRef = await firestore.collection(collections[collectionIdx]);

      queryRef = await fsRef
        .get()
        .then((res) => {
          res.forEach((doc) => {
            sendData.push({
              docId: doc.id,
              empId: doc.data().empId,
              name: doc.data().name,
              rank: doc.data().rank,
            });
          });
        })
        .then(async () => {
          collectionIdx++;
          fsRef = await firestore.collection(collections[collectionIdx]);

          await Promise.all(
            sendData.map(async (data, idx) => {
              let annualHolidays = [];

              queryRef = await fsRef.where("userRef", "==", data.docId);

              await queryRef.get().then((res) => {
                res.docs.map((doc) => {
                  annualHolidays.push({
                    year: doc.data().year,
                    allAnnual: doc.data().allAnnual,
                    usedAnnual: doc.data().usedAnnual,
                  });
                });
                data.annualHolidays = annualHolidays;
                sendData.splice(idx, 1, data);
              });
            })
          );
        });
    } else if (pageCode === "MM0103") {
      fsRef = await firestore.collection(collections[collectionIdx]);

      queryRef = await fsRef.where("useyn", "==", "y");

      await queryRef.get().then((res) => {
        res.forEach((doc) => {
          sendData.push({
            docId: doc.id,
            empId: doc.data().empId,
            name: doc.data().name,
            rank: doc.data().rank,
          });
        });
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const getEmpInfo = async (key) => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("employee");

    queryRef = await fsRef.where("empId", "==", key);

    await queryRef.get().then((res) => {
      res.forEach((doc) => {
        sendData = {
          docId: doc.id,
          empId: doc.data().empId,
          name: doc.data().name,
          rank: doc.data().rank,
          avatar: doc.data().avatar,
          addr1: doc.data().addr1,
          addr2: doc.data().addr2,
          birthday: doc.data().birthday,
          hire: doc.data().hire,
          loc: doc.data().loc,
          zoneCode: doc.data().zoneCode,
          useyn: doc.data().useyn,
        };
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return sendData;
};

const removeEmpInfo = async (empInfo) => {
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

  return sendData;
};

const getAnnualInfo = async (key) => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("annualHoliday");
    queryRef = await fsRef.where("userRef", "==", key);
    await queryRef.get().then((res) => {
      res.forEach((doc) => {
        sendData.push({
          year: doc.data().year,
          allAnnual: doc.data().allAnnual,
          usedAnnual: doc.data().usedAnnual,
          userref: doc.data().userRef,
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
  callCollection,
  getEmpInfo,
  removeEmpInfo,
  getAnnualInfo,
};

module.exports = apiController;
