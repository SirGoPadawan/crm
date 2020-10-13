class BaseController {
  static modelClass = null;
  static fields = [];
  static actionIndex(request, response) {
    this.modelClass
      .findAll({ attributes: this.fields })
      .then((data) => response.json(data))
      .catch((e) => console.log(e));
  }
  static actionCreate(request, response) {
    this.modelClass
      .create(request.body)
      .then(() => this.actionIndex(request, response))
      .catch((e) => console.log(e));
  }
  static actionUpdate(request, response) {
    this.modelClass
      .update(request.body, { where: { id: request.params.id } })
      .then(() => this.actionIndex(request, response))
      .catch((e) => console.log(e));
  }
  static actionDelete(request, response) {
    this.modelClass
      .destroy({ where: { id: request.params.id } })
      .then(() => this.actionIndex(request, response))
      .catch((e) => console.log(e));
  }
}

module.exports = BaseController;
