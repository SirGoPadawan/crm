const BaseModel = require("./BaseModel");
const dayjs = require("dayjs");

class Record extends BaseModel {
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      client_id: {
        type: DataTypes.INTEGER,
      },
      employee_id: {
        type: DataTypes.INTEGER,
      },
      service_id: {
        type: DataTypes.INTEGER,
      },
      date_recording: {
        type: DataTypes.DATE,
        get() {
          return dayjs(this.getDataValue("date_recording")).format(
            "YYYY-MM-DD HH:mm"
          );
        },
        set(value) {
          this.setDataValue(
            "date_recording",
            dayjs(value).format("YYYY-MM-DD HH:mm:ss")
          );
        },
      },
      duration: {
        type: DataTypes.TIME,
        get() {
          const time = this.getDataValue("duration")
            .toString()
            .split(":");
          return `${time[0] + ":" + time[1]}`;
        },
      },
    };
  }
}

module.exports = Record;
