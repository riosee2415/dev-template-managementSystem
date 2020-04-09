import express from "express";
import routes from "../../routes";
import MM0102Controller from "../../controller/MM01/MM0102Controller";

const MM0102Router = express.Router();

MM0102Router.post(routes.getAnnualInfo, MM0102Controller.getAnnualInfo);

export default MM0102Router;
