import winston from "winston";
import moment from "moment";

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  defaultMeta: { timestamp: moment(new Date()).format("DD/MM/YYYY HH:mm:ss") },
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

if (process.env.NODE_ENV === "development") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    })
  );
}
export default logger;
