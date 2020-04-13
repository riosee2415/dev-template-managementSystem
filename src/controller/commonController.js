import firestore from "../firebase";

const loginProcess = async (req, res) => {
  const id = req.body.inputId;
  const pass = req.body.inputPass;

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

  return res.json(sendData);
};

const callCollection = async (req, res) => {
  const pageCode = req.body.pageCode;
  const collections = req.body.collections;

  let fsRef;
  let queryRef;
  let sendData = [];
  let collectionIdx = 0;

  try {
    if (pageCode === "MM0102") {
      fsRef = await firestore.collection(collections[collectionIdx]);

      queryRef = await fsRef.where("useyn", "==", "y");

      await queryRef
        .get()
        .then((res) => {
          res.forEach((doc) => {
            sendData.push({
              docId: doc.id,
              empId: doc.data().empId,
              name: doc.data().name,
              position: doc.data().position,
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
            position: doc.data().position,
          });
        });
      });
    } else if (pageCode == "MM0202") {
      fsRef = await firestore.collection(collections[collectionIdx]);

      queryRef = await fsRef.get().then((res) => {
        res.forEach((doc) => {
          sendData.push({
            docId: doc.id,
            projectName: doc.data().name,
            projectType: doc.data().type,
<<<<<<< HEAD
=======
          });
        });
      });
    } else if (pageCode == "MM0701") {
      fsRef = await firestore.collection(collections[collectionIdx]);

      queryRef = await fsRef.get().then((res) => {
        res.forEach((doc) => {
          sendData.push({
            docId: doc.id,
            cliName: doc.data().name,
            cliChief: doc.data().chiefName,
>>>>>>> refs/remotes/origin/master
          });
        });
      });
    }
  } catch (e) {
    console.log(e);
  } finally {
  }

  return res.json(sendData);
};

const getCommonData = async (req, res) => {
  const collectionName = req.body.collectionName;
  const docName = req.body.docName;

  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection(collectionName);

    queryRef = await fsRef
      .doc(docName)
      .get()
      .then((res) => (sendData = res.data()));
  } catch (e) {
    console.log(e);
  } finally {
  }

  return res.json(sendData);
};

const getClientInfo = async (req, res) => {
  const cliRef = req.body.cliRef;

  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("client");

    queryRef = await fsRef
      .doc(cliRef)
      .get()
      .then((res) => (sendData = res.data()));
  } catch (e) {
    console.log(e);
  } finally {
  }

  return res.json(sendData);
};

const CommonController = {
  loginProcess,
  callCollection,
  getCommonData,
  getClientInfo,
};

export default CommonController;
