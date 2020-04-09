import firestore from "../../firebase";
import MM0103Controlloer from "../MM01/MM0103Controller";

const getAnnualInfo = async (req, res) => {
  const key = req.body.key;
  req.body.isController = true;

  const empData = await MM0103Controlloer.getEmpInfo(req, res);

  let fsRef;
  let queryRef;
  let sendData = [];

  try {
    fsRef = await firestore.collection("annualHoliday");
    queryRef = await fsRef.where("userRef", "==", key);
    await queryRef.get().then((res) => {
      res.forEach((doc) => {
        sendData.push({
          docId: doc.id,
          year: doc.data().year,
          allAnnual: doc.data().allAnnual,
          usedAnnual: doc.data().usedAnnual,
          userRef: doc.data().userRef,
        });
      });
    });
  } catch (e) {
    console.log(e);
  } finally {
    empData.annualInfo = sendData;
  }

  return res.json(empData);
};

const MM0102Controller = {
  getAnnualInfo,
};

export default MM0102Controller;
