import * as winston from "winston";
import "winston-daily-rotate-file";

export default function (opt) {
  const { dir = "./", debug = false } = opt;

  /**
   * colorize 一定要在printf之前
   */
  const CreateConsole = () => {
    return new winston.transports.Console({
      format: winston.format.combine(winston.format.colorize(), printf()),
    });
  };

  const createDailyFile = (type) => {
    return new winston.transports.DailyRotateFile({
      format: winston.format.combine(printf()),
      filename: `${type}-%DATE%.log`,
      datePattern: "YYYY-MM-DD",
      dirname: dir,
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    });
  };

  function printf() {
    return winston.format.printf((info) => {
      const { level, message } = info;
      const stringifiedRest = JSON.stringify(
        Object.assign({}, info, {
          level: undefined,
          message: undefined,
          splat: undefined,
        })
      );
      const restRs = stringifiedRest !== "{}" ? stringifiedRest : "";
      return `${format(
        new Date(),
        "yyyy-MM-dd hh:mm:ss"
      )} ${level}: ${message} ${restRs}`;
    });
  }

  function createLogger(options) {
    const { transports = [] } = options;
    const defaultTransports = []
    if(debug) {
      defaultTransports.push(CreateConsole())
    }
    return winston.createLogger({
      format: winston.format.combine(winston.format.splat()),
      transports: [...defaultTransports , ...transports],
    });
  }

  // 错误日志
  const ErrorLogger = () => {
    return createLogger({
      transports: [createDailyFile("error")],
    });
  };
  // 程序日志
  const AppLogger = () => {
    return createLogger({
      transports: [createDailyFile("app")],
    });
  };

  const errorLogger = ErrorLogger();
  const appLogger = AppLogger();

  return {
    error: errorLogger.error.bind(errorLogger),
    log: appLogger.info.bind(appLogger),
  };
}

function format(date, fmt) {
  const d = new Date(date);
  var o = {
    "M+": d.getMonth() + 1, //月份
    "d+": d.getDate(), //日
    "h+": d.getHours(), //小时
    "m+": d.getMinutes(), //分
    "s+": d.getSeconds(), //秒
    "q+": Math.floor((d.getMonth() + 3) / 3), //季度
    S: d.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (d.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
    }
  }
  return fmt;
}
