const BaseModel = require("./BaseModel");

const dayjs = require("dayjs");

class Record extends BaseModel {
  formatTime(value) {
    return dayjs(`0000-00-00 ${value}`).format("HH:mm:ss");
  }
  static fields(DataTypes) {
    return {
      ...super.fields(DataTypes),
      client_id: {
        type: DataTypes.INTEGER,
      },
      employee_id: {
        type: DataTypes.INTEGER,
      },
      start_record: {
        type: DataTypes.TIME,
        set(value) {
          this.setDataValue("start_record", this.formatTime(value));
        },
      },
      end_record: {
        type: DataTypes.TIME,
        set(value) {
          this.setDataValue("end_record", this.formatTime(value));
        },
      },
      date_recording: {
        type: DataTypes.DATE,
        get() {
          return dayjs(this.getDataValue("date_recording")).format(
            "YYYY-MM-DD"
          );
        },
      },
      duration: {
        type: DataTypes.TIME,
        set(value) {
          const time = dayjs(`0000-00-00 ${value}`).format("HH:mm:ss");
          this.setDataValue("duration", time);
        },
      },
    };
  }
}

module.exports = Record;
