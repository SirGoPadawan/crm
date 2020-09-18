const BaseException = require("./BaseException");

class QueryException extends BaseException {
  constructor() {
    super();
    this.name = "QueryException";
    this.status = 400;
    this.message = "Неверный запрос";
  }
}
module.exports = QueryException;
