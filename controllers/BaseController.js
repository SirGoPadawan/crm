const dayjs = require("dayjs");

class BaseController {
  static modelClass = null;
  static fields = [];
  static actionIndex(request, response) {
    this.modelClass
      .findAll({ attributes: this.fields })
      .then((data) => {
        response.json(data);
      })
      .catch((e) => console.log(e));
  }
  static async actionCreate(request, response) {
    const newItem = await this.modelClass.create(request.body);
    response.json(newItem);
  }
  static actionUpdate(request, response) {
    this.modelClass
      .update(request.body, { where: { id: Number(request.params.id) } })
      .then(() =>
        this.modelClass.findAll({ where: { id: Number(request.params.id) } })
      )
      .then((data) => response.json(data))
      .catch((e) => console.log(e));
  }
  static actionDelete(request, response) {
    this.modelClass
      .destroy({ where: { id: Number(request.params.id) } })
      .then(() => response.json({ delete: "yes" }))
      .catch((e) => console.log(e));
  }
}

module.exports = BaseController;
