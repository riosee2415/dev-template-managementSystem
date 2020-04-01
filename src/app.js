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

app.post(routes.loginProcess, async (req, res) => {
  const sendData = await apiController.loginProcess(
    req.body.inputId,
    req.body.inputPass
  );

  return res.json(sendData);
});

app.listen(PORT, () => {
  console.log(`✅ Server Start On ${PORT}`);
});
