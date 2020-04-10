import express from "express";
import routes from "../routes";
import CommonController from "../controller/CommonController";

const CommonRouter = express.Router();

CommonRouter.post(routes.loginProcess, CommonController.loginProcess);
CommonRouter.post(routes.callCollection, CommonController.callCollection);
CommonRouter.post(routes.getCommonData, CommonController.getCommonData);
CommonRouter.post(routes.getClientInfo, CommonController.getClientInfo);

export default CommonRouter;
