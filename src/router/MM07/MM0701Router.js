import express from "express";
import routes from "../../routes";
import MM0701Controller from "../../controller/MM07/MM0701Controller";

const MM0701Router = express.Router();

MM0701Router.post(routes.getClientDetail, MM0701Controller.getClientInfo);

export default MM0701Router;
