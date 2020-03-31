const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const routes = require("./routes");
const apiController = require("./controller/apiController");

const PORT = 5000;

const app = express();

app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get(routes.loginProcess, (req, res) => {
  const loginFlag = apiController.loginProcess();

  res.send({
    loginFlag
  });
});

app.use("/api/profileInfo", (req, res) => {
  res.send({
    image:
      "https://avatars2.githubusercontent.com/u/44108636?s=460&u=42afa365599d837455c04171238374a6e093cf08&v=4",
    id: "4leaf.ysh",
    name: "윤상호",
    rank: "DEVELOPER"
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server Start On ${PORT}`);
});
