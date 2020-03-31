const express = require("express");
const routes = require("../routes");

const apiRouter = express.Router();

apiRouter.post("/api/loginProcess", (req, res) => {
  console.log("router Suc");

  res.send({
    data: "test"
  });
});

module.exports = apiRouter;
