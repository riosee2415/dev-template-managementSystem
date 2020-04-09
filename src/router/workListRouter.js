import express from "express";
import routes from "../routes";
import projectController from "../controller/projectController";

const workListRouter = express.Router();

workListRouter.post(routes.deleteWorkList, projectController.deleteWorkList);
workListRouter.post(
  routes.changedWorkListStatus,
  projectController.chagneStatus
);

export default workListRouter;
