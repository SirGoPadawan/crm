const express = require("express");
const router = express.Router();
const multer = require("multer");
const { User } = require("../models");

const storage = multer.diskStorage({
  destination: function(req, files, cb) {
    cb(null, "static/uploads");
  },
  filename: function(req, files, cb) {
    let arr = files.mimetype.split("/");
    let ext = arr[1];
    cb(null, files.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.any(), function(req, res, next) {
  User.update(
    {
      path_img: "/uploads/" + req.files[0].filename,
    },
    { where: { phone: req.body.userPhone } }
  )
    .then(() =>
      User.findAll({
        attributes: [
          "id",
          "first_name",
          "last_name",
          "patronymic",
          "phone",
          "email",
          "path_img",
        ],
      })
        .then((data) => res.status(200).json(data))
        .catch((e) => console.log(e))
    )
    .catch((e) => console.log(e));
});

module.exports = router;
