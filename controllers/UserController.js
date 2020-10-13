const { User } = require("../models");
const BaseController = require("./BaseController");

class UserController extends BaseController {
  static modelClass = User;
  static fields = [
    "id",
    "first_name",
    "last_name",
    "patronymic",
    "phone",
    "email",
    "path_img",
  ];
}

module.exports = UserController;
