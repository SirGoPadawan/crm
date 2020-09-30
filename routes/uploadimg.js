const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");
const multer = require("multer");

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

router.post("/", upload.any(), function(req, res, next) {
  pool.query(
    `UPDATE users SET img = "${"uploads/" +
      req.files[0].filename}" WHERE phone="${req.body.userPhone}"`
  );
  res.status(200).json("успешно добавлено");
});

module.exports = router;
