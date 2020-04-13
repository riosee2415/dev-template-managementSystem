import firestore from "../../firebase";

const getClientInfo = async (req, res) => {
  const {
    body: { key },
  } = req;

  let fsRef;
  let queryRef;
  let sendData = {};

  try {
    fsRef = await firestore.collection("client").doc(key);

    queryRef = await fsRef.get().then((res) => {
      sendData = {
        id: res.id,
        BP: res.data().BP,
        address: res.data().address,
        business: res.data().business,
        businessNumber: res.data().businessNumber,
        chiefName: res.data().chiefName,
        insDate: res.data().insDate,
        name: res.data().name,
        status: res.data().status,
        taxation: res.data().taxation,
        type: res.data().type,
      };
    });
  } catch (e) {
    console.log(e);
  } finally {
  }

  return res.json(sendData);
};

const MM0701Controller = {
  getClientInfo,
};

export default MM0701Controller;
