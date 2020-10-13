const QueryException = require("../exception/QueryException");
const LoginException = require("../exception/LoginException");

const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../configServer.json");
const { User } = require("../models");

const tokenKey = config.jwt.tokenKey;

router.post("/", function(req, res, next) {
  console.log(req.body);
  User.findOne({ where: { phone: req.body.phone } })
    .then((data) => {
      if (bcrypt.compareSync(req.body.password, data.password)) {
        data.token = jwt.sign({ phone: data.phone }, tokenKey, {
          algorithm: "HS256",
          expiresIn: "1h",
        });
        User.update(
          {
            token: data.token,
          },
          { where: { phone: req.body.phone } }
        ).catch((e) => console.log(e));
        res.status(200).json(data.token);
      } else {
        res.json({ err: "неверный пароль" });
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
