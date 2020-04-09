import firestore from "../firebase";

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
  getAnnualInfo
};

module.exports = apiController;
