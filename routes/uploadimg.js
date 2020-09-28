const express = require("express");
const router = express.Router();
const mysql = require("mysql");
const config = require("../configServer.json");
const jwt = require("jsonwebtoken");
const multer = require("multer");

const app = express();
const storage = multer.diskStorage({
  destination: function(req, files, cb) {
    cb(null, "uploads");
  },
  filename: function(req, files, cb) {
    let arr = files.mimetype.split("/");
    let ext = arr[1];
    cb(null, files.fieldname + "-" + Date.now() + "." + ext);
  },
});

const upload = multer({ storage: storage });

const pool = mysql.createPool(config.database);

const tokenKey = config.jwt.tokenKey;

router.post("/", upload.any(), function(req, res, next) {
  const token = req.headers.authentication;
  jwt.verify(token, tokenKey, function(err, decoded) {
    if (err) {
      res.status(401).json({ reason: "unauthorized" });
      console.log(err);
    }
    if (decoded) {
      pool.query(
        `UPDATE users SET img = "${"uploads/" +
          req.files[0].filename}" WHERE phone="${req.body.userPhone}"`
      );
      res.status(200).json("успешно добавлено");
    }
  });
});

module.exports = router;
