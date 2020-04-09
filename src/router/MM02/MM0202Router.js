import express from "express";
import routes from "../../routes";
import MM0202Controller from "../../controller/MM02/MM0202Controller";

const MM0202Router = express.Router();

MM0202Router.post(routes.deleteWorkList, MM0202Controller.deleteWorkList);
MM0202Router.post(routes.changedWorkListStatus, MM0202Controller.chagneStatus);
MM0202Router.post(routes.addWorkList, MM0202Controller.addWorkList);
MM0202Router.post(routes.getEmpList, MM0202Controller.getEmpList);
MM0202Router.post(
  routes.getProjectWorkListInfo,
  MM0202Controller.getProjectWorkListInfo
);
MM0202Router.post(routes.getProjectInfo, MM0202Controller.getProjectInfo);

export default MM0202Router;
