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
  static async actionUpdateImg(request, response) {
    try {
      await this.modelClass.update(
        {
          path_img: "/uploads/" + request.files[0].filename,
        },
        { where: { id: request.params.id } }
      );
      const data = await this.modelClass.findAll({
        where: { id: request.params.id },
      });
      response.status(200).json(data);
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionNewTokens(request, response) {
    try {
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
    } catch (error) {
      response.status(400).json(error);
    }
  }
}

module.exports = UserController;
