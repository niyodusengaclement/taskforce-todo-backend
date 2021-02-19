import logger from "./logger";

export const onSuccess = (res, status_code, message, data) => {
  return res.status(status_code).json({
    status: status_code,
    message,
    data,
  });
};

export const onError = (res, status_code, error) => {
  return res.status(status_code).json({
    status: status_code,
    error,
  });
};

export const onServerError = (res, error) => {
  if (error) {
    logger.error(error, "error", new Date());
  }
  return res.status(500).json({
    status: 500,
    error: "Internal Server Error",
  });
};
