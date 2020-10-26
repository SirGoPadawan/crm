const QueryException = require("../exception/QueryException");
const LoginException = require("../exception/LoginException");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configServer.json");
const { User } = require("../models");

const tokenKey = config.jwt.tokenKey;

router.post("/", async (req, res, next) => {
  const data = await User.findOne({ where: { phone: req.body.phone } });
  try {
    if (bcrypt.compareSync(req.body.password, data.password)) {
      data.token = jwt.sign({ phone: data.phone }, tokenKey, {
        algorithm: "HS256",
        expiresIn: "30m",
      });
      data.refresh_token = jwt.sign({ phone: data.phone }, tokenKey, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      data.save();
      res
        .status(200)
        .json({ token: data.token, refreshToken: data.refresh_token });
    }
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
