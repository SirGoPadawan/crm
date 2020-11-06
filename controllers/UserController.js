const { User } = require("../models");
const BaseController = require("./BaseController");
const jwt = require("jsonwebtoken");
const config = require("../configServer.json");
const tokenKey = config.jwt.tokenKey;

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
        { where: { id: request.params.id } }
      )
      .then(() =>
        this.modelClass
          .findAll({
            where: { id: request.params.id },
          })
          .then((data) => response.status(200).json(data))
          .catch((e) => console.log(e))
      )
      .catch((e) => console.log(e));
  }
  static async actionNewTokens(request, response) {
    const decode = jwt.decode(request.headers.authorization);
    const data = await this.modelClass.findAll({
      where: { phone: decode.phone },
    });
    if (data[0].refresh_token === request.headers.authorization) {
      data[0].token = jwt.sign({ phone: data[0].phone }, tokenKey, {
        algorithm: "HS256",
        expiresIn: "30m",
      });
      data[0].refresh_token = jwt.sign({ phone: data[0].phone }, tokenKey, {
        algorithm: "HS256",
        expiresIn: "1h",
      });
      data[0].save();
      response
        .status(200)
        .json({ token: data[0].token, refreshToken: data[0].refresh_token });
    } else {
      response.status(403).json({ reason: "невалидный токен" });
    }
  }
}

module.exports = UserController;
