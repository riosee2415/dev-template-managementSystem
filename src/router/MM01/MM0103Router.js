import express from "express";
import routes from "../../routes";
import AWS from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";
import MM0103Controller from "../../controller/MM01/MM0103Controller";

const MM0103Router = express.Router();

AWS.config.region = "ap-northeast-2";
AWS.config.update({
  accessKeyId: "AKIAIIDXVCFTR32FWB6Q",
  secretAccessKey: "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"
});

const s3 = new AWS.S3();

const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: "management-system.4leaf",
    contentType: multerS3.AUTO_CONTENT_TYPE,
    dest: "uploads/",
    key: function(req, file, cb) {
      let extension = path.extname(file.originalname);
      cb(null, Date.now().toString() + extension);
    },
    acl: "public-read-write"
  })
});
console.log("upload");
console.log(upload);
MM0103Router.post(routes.getEmpInfo, MM0103Controller.getEmpInfo);

MM0103Router.post(
  routes.addEmpInfo,
  upload.single("profile_file"),
  MM0103Controller.addEmpInfo
);

MM0103Router.post(routes.modifyEmpInfo, MM0103Controller.modifyEmpInfo);

MM0103Router.post(routes.removeEmpInfo, MM0103Controller.removeEmpInfo);

MM0103Router.post(routes.getEmpIdCheck, MM0103Controller.getEmpIdCheck);

export default MM0103Router;
