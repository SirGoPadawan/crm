const BaseException = require("./BaseException");

class UserExistsException extends BaseException {
  constructor() {
    super();
    this.name = "UserExistsException";
    this.message = "Пользователь уже существует";
    this.status = 400;
  }
}
module.exports = UserExistsException;
