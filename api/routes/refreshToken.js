const router = require("express").Router();
const UserController = require("../controllers/UserController");

router.post("/", (req, res) => UserController.actionNewTokens(req, res));

module.exports = router;
