import firestore from "../firebase";

const getCommonData = async (collectionName, docName) => {
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

  return sendData;
};

const commonController = {
  getCommonData,
};

export default commonController;
