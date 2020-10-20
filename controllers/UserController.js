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
  static actionUpdateImg(request, response) {
    this.modelClass
      .update(
        {
          path_img: "/uploads/" + request.files[0].filename,
        },
        { where: { phone: request.body.userPhone } }
      )
      .then(() =>
        this.modelClass
          .findAll({
            where: { phone: request.body.userPhone },
          })
          .then((data) => response.status(200).json(data))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  }
}

module.exports = UserController;
