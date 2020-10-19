const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const config = require("./configServer.json");
const jwt = require("jsonwebtoken");

const registrationRouter = require("./routes/registration");
const usersRouter = require("./routes/users");
const servicesRouter = require("./routes/services");
const loginRouter = require("./routes/login");
const uploadImgRouter = require("./routes/uploadimg");
const citiesRouter = require("./routes/cities");

const tokenKey = config.jwt.tokenKey;

const app = express();

app.use(cors());

const publicPaths = ["/", "/login"];

app.use((req, res, next) => {
  console.log(req.headers);
  let value = publicPaths.includes(req.path);
  if (value) {
    next();
  } else if (req.headers.authentication) {
    jwt.verify(req.headers.authentication, tokenKey, (err, decoded) => {
      if (err) {
        res.status(403).json({ reason: "unauthorized" });
      } else if (decoded) {
        next();
      }
    });
  } else res.status(403).json({ reason: "unauthorized" });
});

app.use(bodyParser.json());
app.use(helmet());

app.disable("x-powered-by");

app.use("/registration", registrationRouter);
app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/login", loginRouter);
app.use("/uploadimg", uploadImgRouter);
app.use("/cities", citiesRouter);

app.listen(app.get("port"), () => {
  console.log("CORS-enabled web server listening on port 8080");
});
module.exports = app;
