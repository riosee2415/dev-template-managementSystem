import express from "express";
import routes from "../../routes";
import MM0103Controller from "../../controller/MM01/MM0103Controller";

const MM0103Router = express.Router();

MM0103Router.post(routes.getEmpInfo, MM0103Controller.getEmpInfo);

MM0103Router.post(routes.removeEmpInfo, MM0103Controller.removeEmpInfo);

export default MM0103Router;
