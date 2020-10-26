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
const citiesRouter = require("./routes/cities");
const companiesRouter = require("./routes/companies");
const branchesRouter = require("./routes/branches");
const recordsRouter = require("./routes/records");
const refreshTokenRouter = require("./routes/refreshToken");

const tokenKey = config.jwt.tokenKey;

const app = express();

app.use(cors());

const publicPaths = ["/", "/registration", "/login", "/refreshToken"];

app.use((req, res, next) => {
  let value = publicPaths.includes(req.path);
  if (value) {
    next();
  } else if (req.headers.authentication) {
    jwt.verify(req.headers.authentication, tokenKey, (err, decoded) => {
      if (err) {
        switch (err.name) {
          case "JsonWebTokenError": {
            res.status(403).json({ reason: "Невалидный токен" });
          }
          default: {
            res.status(403).json(err.message);
          }
        }
      } else if (decoded) {
        next();
      }
    });
  } else res.status(403).json({ reason: "Недостаточно прав" });
});

app.use(bodyParser.json());
app.use(helmet());

app.disable("x-powered-by");

app.use("/registration", registrationRouter);
app.use("/users", usersRouter);
app.use("/services", servicesRouter);
app.use("/login", loginRouter);
app.use("/cities", citiesRouter);
app.use("/companies", companiesRouter);
app.use("/branches", branchesRouter);
app.use("/records", recordsRouter);
app.use("/refreshToken", refreshTokenRouter);

app.listen(app.get("port"), () => {
  console.log("CORS-enabled web server listening on port 8080");
});
module.exports = app;
