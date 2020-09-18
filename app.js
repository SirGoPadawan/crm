const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const registrationRouter = require("./routes/registration");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/registration", registrationRouter);

app.listen(app.get("port"), function() {
  console.log("CORS-enabled web server listening on port 8080");
});
module.exports = app;
