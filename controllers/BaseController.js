const dayjs = require("dayjs");
const { json } = require("sequelize/types");

class BaseController {
  static modelClass = null;
  static fields = [];
  static async actionIndex(request, response) {
    try {
      const data = await this.modelClass.findAll({ attributes: this.fields });
      response.json(200).json(data);
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionCreate(request, response) {
    try {
      const newItem = await this.modelClass.create(request.body);
      response.status(200).json(newItem);
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionUpdate(request, response) {
    try {
      await this.modelClass.update(request.body, {
        where: { id: Number(request.params.id) },
      });
      const data = await this.modelClass.findAll({
        where: { id: Number(request.params.id) },
      });
      response.status(200).json(data);
    } catch (error) {
      response.status(400).json(error);
    }
  }
  static async actionDelete(request, response) {
    try {
      await this.modelClass.destroy({
        where: { id: Number(request.params.id) },
      });
      response.status(200).json({ delete: "yes" });
    } catch (error) {
      response.status(400).json(error);
    }
  }
}

module.exports = BaseController;
