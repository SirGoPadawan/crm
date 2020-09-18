const BaseException = require("./BaseException");

class NotFoundException extends BaseException {
  constructor() {
    super();
    this.name = "NotFoundException";
    this.status = 404;
    this.message = "Страница не найдена";
  }
}
module.exports = NotFoundException;
