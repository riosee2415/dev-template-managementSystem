import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import apiController from "./controller/apiController";
import CommonRouter from "./router/CommonRouter";
import MM0101Router from "./router/MM01/MM0101Router";
import MM0103Router from "./router/MM01/MM0103Router";
import MM0202Router from "./router/MM02/MM0202Router";

const PORT = 5000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(routes.getAnnualInfo, async (req, res) => {
  const key = req.body.key;

  const sendData = await apiController.getEmpInfo(key);

  const annualInfo = await apiController.getAnnualInfo(key);

  sendData.annualInfo = annualInfo;

  return res.json(sendData);
});

/* COMMON */
app.post(routes.loginProcess, CommonRouter);
app.post(routes.callCollection, CommonRouter);
app.post(routes.getCommonData, CommonRouter);

/* MM0101 */
app.post(routes.getworkStart, MM0101Router);
app.post(routes.getDetailDataToWorkTime, MM0101Router);
app.post(routes.saveWorkTimeToStart, MM0101Router);
app.post(routes.saveWorkTimeToEnd, MM0101Router);

/* MM0102 */

/* MM0103 */
app.post(routes.getEmpInfo, MM0103Router);
app.post(routes.removeEmpInfo, MM0103Router);

/* MM0202 */
app.post(routes.deleteWorkList, MM0202Router);
app.post(routes.changedWorkListStatus, MM0202Router);
app.post(routes.addWorkList, MM0202Router);
app.post(routes.getEmpList, MM0202Router);
app.post(routes.getProjectWorkListInfo, MM0202Router);
app.post(routes.getProjectInfo, MM0202Router);

app.listen(PORT, () => {
  console.log(`✅ Server Start On ${PORT}`);
});
