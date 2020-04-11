import express from "express";
import routes from "../../routes";
import MM0101Controller from "../../controller/MM01/MM0101Controller";

const MM0101Router = express.Router();

MM0101Router.post(
  routes.saveWorkTimeToStart,
  MM0101Controller.saveWorkTimeToStart
);

MM0101Router.post(routes.saveWorkTimeToEnd, MM0101Controller.saveWorkTimeToEnd);

MM0101Router.post(routes.getworkStart, MM0101Controller.getWorkTime);

MM0101Router.post(
  routes.getDetailDataToWorkTime,
  MM0101Controller.getDetailDataToWorkTime
);

export default MM0101Router;
