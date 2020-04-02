const firestore = require("../firebase");

/** [Firestore WorkRecord Sample]
 *  date        [String]
 *  endTiem     [String]
 *  holidayType [String]
 *  id          [String]
 *  isHoliday   [Boolean]
 *  startTime   [String]
 */
const saveWorkTimeToStart = async data => {
  let fsRef;
  let queryRef;
  let sendData = {
    date: data.inputDate,
    id: data.id,
    startTime: data.inputStartTime
  };

  console.log(sendData);

  try {
    fsRef = await firestore.collection("workRecord");

    queryRef = await fsRef.add(sendData);
  } catch (e) {
    console.log(e);
  } finally {
  }

  return null;
};

const apiControllerWork = { saveWorkTimeToStart };

module.exports = apiControllerWork;
