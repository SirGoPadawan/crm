const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");

const registrationRouter = require("./routes/registration");
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");
const loginRouter = require("./routes/login");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(helmet());

app.disable("x-powered-by");

app.use("/registration", registrationRouter);
app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/login", loginRouter);

app.listen(app.get("port"), function() {
  console.log("CORS-enabled web server listening on port 8080");
});
module.exports = app;
