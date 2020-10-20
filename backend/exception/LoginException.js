const BaseException = require("./BaseException");

class LoginException extends BaseException {
  constructor() {
    super();
    this.name = "LoginException";
    this.message = "Неверный пароль";
    this.status = 401;
  }
}
module.exports = LoginException;
