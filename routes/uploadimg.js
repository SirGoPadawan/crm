const express = require("express");
const router = express.Router();
const pool = require("../poolCreate");
const multer = require("multer");

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
  pool.query(
    `UPDATE users SET path_img = "${"/uploads/" +
      req.files[0].filename}" WHERE phone="${req.body.userPhone}"`,
    function(err, data) {
      try {
        if (err) {
          throw new Error();
        }
        pool.query(
          "SELECT id, first_name, last_name, patronymic, email, phone, path_img FROM users",
          function(err, data) {
            try {
              if (err) {
                throw new Error();
              }
              res.status(200).json(data);
            } catch (e) {
              console.log(e);
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    }
  );
});

module.exports = router;
