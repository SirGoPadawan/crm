const QueryException = require("../exception/QueryException");
const UserExistsException = require("../exception/UserExistsException");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { User } = require("../models");

router.post("/", function(req, res, next) {
  User.findOne({ where: { phone: req.body.phone } })
    .then((data) => {
      if (!data) {
        User.create({
          first_name: req.body.first_name,
          last_name: req.body.last_name,
          patronymic: req.body.patronymic,
          phone: req.body.phone,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
        })
          .then(() => res.status(201).json({ isCreate: "yes" }))
          .catch((e) => console.log(e));
      }
    })
    .catch((e) => console.log(e));
});

module.exports = router;
