import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import routes from "./routes";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import CommonRouter from "./router/CommonRouter";
import MM0101Router from "./router/MM01/MM0101Router";
import MM0102Router from "./router/MM01/MM0102Router";
import MM0103Router from "./router/MM01/MM0103Router";
import MM0202Router from "./router/MM02/MM0202Router";
import MM0701Router from "./router/MM07/MM0701Router";

const PORT = 5000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

AWS.config.region = "ap-northeast-2";
AWS.config.update({
  accessKeyId: "AKIAJJXABXCU5ZQB3H6Q",
  secretAccessKey: "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"
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "management-system.4leaf",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    key: function(req, file, cb) {
      const path = `uploads/${Date.now().toString()}_${file.originalname}`;
      cb(null, path);
    },
    acl: "public-read-write"
  })
});

/* COMMON */
app.post(routes.loginProcess, CommonRouter);
app.post(routes.callCollection, CommonRouter);
app.post(routes.getCommonData, CommonRouter);
app.post(routes.getClientInfo, CommonRouter);

/* MM0101 */
app.post(routes.getworkStart, MM0101Router);
app.post(routes.getDetailDataToWorkTime, MM0101Router);
app.post(routes.saveWorkTimeToStart, MM0101Router);
app.post(routes.saveWorkTimeToEnd, MM0101Router);

/* MM0102 */
app.post(routes.getAnnualInfo, MM0102Router);

/* MM0103 */
app.post(routes.getEmpInfo, MM0103Router);
app.post(routes.addEmpInfo, upload.single("profile_file"), MM0103Router);
app.post(routes.modifyEmpInfo, MM0103Router);
app.post(routes.removeEmpInfo, MM0103Router);
app.post(routes.getEmpIdCheck, MM0103Router);

/* MM0202 */
app.post(routes.deleteWorkList, MM0202Router);
app.post(routes.changedWorkListStatus, MM0202Router);
app.post(routes.addWorkList, MM0202Router);
app.post(routes.getEmpList, MM0202Router);
app.post(routes.getProjectWorkListInfo, MM0202Router);
app.post(routes.getProjectInfo, MM0202Router);

/* MM0701 */
app.post(routes.getClientDetail, MM0701Router);

app.listen(PORT, () => {
  console.log(`✅ Server Start On ${PORT}`);
});
