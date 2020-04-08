import firestore from "../firebase";

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
        .then(res => {
          res.forEach(doc => {
            sendData.push({
              docId: doc.id,
              empId: doc.data().empId,
              name: doc.data().name,
              position: doc.data().position
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

              await queryRef.get().then(res => {
                res.docs.map(doc => {
                  annualHolidays.push({
                    year: doc.data().year,
                    allAnnual: doc.data().allAnnual,
                    usedAnnual: doc.data().usedAnnual
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

      await queryRef.get().then(res => {
        res.forEach(doc => {
          sendData.push({
            docId: doc.id,
            empId: doc.data().empId,
            name: doc.data().name,
            position: doc.data().position
          });
        });
      });
    } else if (pageCode == "MM0202") {
      fsRef = await firestore.collection(collections[collectionIdx]);

      queryRef = await fsRef.get().then(res => {
        res.forEach(doc => {
          sendData.push({
            docId: doc.id,
            projectName: doc.data().name,
            projectType: doc.data().type
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

const getEmpInfo = async key => {
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

  return sendData;
};

const removeEmpInfo = async empInfo => {
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

  return sendData;
};

const getAnnualInfo = async key => {
  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("annualHoliday");
    queryRef = await fsRef.where("userRef", "==", key);
    await queryRef.get().then(res => {
      res.forEach(doc => {
        sendData.push({
          docId: doc.id,
          year: doc.data().year,
          allAnnual: doc.data().allAnnual,
          usedAnnual: doc.data().usedAnnual,
          userRef: doc.data().userRef
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
  getAnnualInfo
};

module.exports = apiController;
