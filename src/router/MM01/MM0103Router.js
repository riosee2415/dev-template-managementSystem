import express from "express";
import routes from "../../routes";
import MM0103Controller from "../../controller/MM01/MM0103Controller";

const MM0103Router = express.Router();

MM0103Router.post(routes.getEmpInfo, MM0103Controller.getEmpInfo);

MM0103Router.post(routes.addEmpInfo, MM0103Controller.addEmpInfo);

MM0103Router.post(routes.modifyEmpInfo, MM0103Controller.modifyEmpInfo);

MM0103Router.post(routes.removeEmpInfo, MM0103Controller.removeEmpInfo);

MM0103Router.post(routes.getEmpIdCheck, MM0103Controller.getEmpIdCheck);

export default MM0103Router;
