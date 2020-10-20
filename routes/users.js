const express = require("express");
const router = express.Router();
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

const UserController = require("../controllers/UserController");

router
  .get("/", (req, res) => UserController.actionIndex(req, res))
  .delete("/:id", (req, res) => UserController.actionDelete(req, res))
  .put("/:id", (req, res) => UserController.actionUpdate(req, res))
  .post("/uploadimg", upload.any(), (req, res) =>
    UserController.actionUpdateImg(req, res)
  )
  .post("/", (req, res) => UserController.actionCreate(req, res));

module.exports = router;
