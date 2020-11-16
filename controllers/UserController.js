const BaseController = require("./BaseController");

const jwt = require("jsonwebtoken");
const config = require("../configServer.json");
const bcrypt = require("bcrypt");
const salt = bcrypt.genSaltSync(10);
const { User } = require("../models");

const tokenKey = config.jwt.tokenKey;

class UserController extends BaseController {
  static getToken(item, tokenKey, exp) {
    return jwt.sign({ phone: item }, tokenKey, {
      algorithm: "HS256",
      expiresIn: exp,
    });
  }
  static modelClass = User;
  static fields = [
    "id",
    "first_name",
    "last_name",
    "patronymic",
    "phone",
    "email",
    "path_img",
    "birthday",
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
      const data = await this.modelClass.findOne({
        where: { phone: decode.phone },
      });
      if (data) {
        if (data.refresh_token === request.headers.authorization) {
          data.token = this.getToken(data.phone, tokenKey, "30m");
          data.refresh_token = this.getToken(data.phone, tokenKey, "1h");
          data.save();
          response
            .status(200)
            .json({ token: data.token, refreshToken: data.refresh_token });
        } else throw new Error();
      } else throw new Error();
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionRegistration(request, response) {
    try {
      const data = await this.modelClass.findOne({
        where: { phone: request.body.phone },
      });
      if (!data) {
        this.modelClass.create({
          ...request.body,
          password: bcrypt.hashSync(request.body.password, salt),
        });
        response.status(200).json({ isCreated: "yes" });
      } else throw new Error();
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionLogin(request, response) {
    try {
      const data = await this.modelClass.findOne({
        where: { phone: request.body.phone },
      });
      if (data) {
        if (bcrypt.compareSync(request.body.password, data.password)) {
          data.token = this.getToken(data.phone, tokenKey, "30m");
          data.refresh_token = this.getToken(data.phone, tokenKey, "1h");
          data.save();
          response.status(200).json({
            token: data.token,
            refreshToken: data.refresh_token,
          });
        } else throw new Error();
      } else throw new Error();
    } catch (error) {
      response.status(400).json(error);
    }
  }
}

module.exports = UserController;
