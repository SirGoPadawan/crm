class BaseException {
  constructor(message = "", status = null) {
    this.message = message;
    this.status = status;
    this.name = "BaseException";
    this.stack = new Error().stack;
  }
}
module.exports = BaseException;
