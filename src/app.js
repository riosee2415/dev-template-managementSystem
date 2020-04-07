import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import apiController from "./controller/apiController";
import apiControllerWork from "./controller/apiControllerWork";
import projectController from "./controller/projectController";
import commonController from "./controller/commonController";

const PORT = 5000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(routes.loginProcess, async (req, res) => {
  const sendData = await apiController.loginProcess(
    req.body.inputId,
    req.body.inputPass
  );

  return res.json(sendData);
});

app.post(routes.callCollection, async (req, res) => {
  const pageCode = req.body.pageCode;
  const collections = req.body.collections;
  const sendData = await apiController.callCollection(pageCode, collections);

  return res.json(sendData);
});

app.post(routes.saveWorkTimeToStart, async (req, res) => {
  const data = req.body.inputData;

  const sendData = await apiControllerWork.saveWorkTimeToStart(data);
});

app.post(routes.getworkStart, async (req, res) => {
  const data = req.body.inputData;
  const sendData = await apiControllerWork.getWorkTime(data);

  return res.json(sendData);
});

app.post(routes.getEmpInfo, async (req, res) => {
  const key = req.body.key;

  const sendData = await apiController.getEmpInfo(key);

  return res.json(sendData);
});

app.post(routes.getAnnualInfo, async (req, res) => {
  const key = req.body.key;

  const sendData = await apiController.getEmpInfo(key);

  const annualInfo = await apiController.getAnnualInfo(key);

  sendData.annualInfo = annualInfo;

  return res.json(sendData);
});

app.post(routes.saveWorkTimeToEnd, async (req, res) => {
  const data = req.body.inputData;
  const sendData = await apiControllerWork.saveWorkTimeToEnd(data);

  return res.json(sendData);
});

app.post(routes.getDetailDataToWorkTime, async (req, res) => {
  const data = req.body.inputData;
  const sendData = await apiControllerWork.getDetailDataToWorkTime(data);

  return res.json(sendData);
});

app.post(routes.removeEmpInfo, async (req, res) => {
  const empInfo = req.body.empInfo;
  const sendData = await apiController.removeEmpInfo(empInfo);

  return res.json(sendData);
});

app.post(routes.getProjectInfo, async (req, res) => {
  const projectRef = req.body.key;
  const sendData = await projectController.getProjectInfo(projectRef);

  return res.json(sendData);
});

app.post(routes.getProjectWorkListInfo, async (req, res) => {
  const projectRef = req.body.projectId;
  const sendData = await projectController.getProjectWorkListInfo(projectRef);

  return res.json(sendData);
});

app.post(routes.getCommonData, async (req, res) => {
  const param1 = req.body.collectionName;
  const param2 = req.body.docName;

  const sendData = await commonController.getCommonData(param1, param2);

  return res.json(sendData);
});

app.post(routes.getEmpList, async (req, res) => {
  const sendData = await projectController.getEmpList();

  return res.json(sendData);
});

app.listen(PORT, () => {
  console.log(`✅ Server Start On ${PORT}`);
});
