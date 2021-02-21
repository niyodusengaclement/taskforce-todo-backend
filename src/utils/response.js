import logger from "./logger";

/**
 * This is a function.
 *
 * @param {object} res- The response object
 * @param {number} status_code - The HTTP response status code
 * @param {string} message - Message to show a client
 * @param {object} data - Data to send to the client
 * @return {method} data - Return response to the client
 *
 */
export const onSuccess = (res, status_code, message, data) => {
  if (message === "Login Successfully") {
    return res.status(status_code).header('x-auth-token', data).json({
      status: status_code,
      message,
      data,
    });
  }
  return res.status(status_code).json({
    status: status_code,
    message,
    data,
  });
};

/**
 * This is a function.
 *
 * @param {object} res- The response object
 * @param {number} status_code - The HTTP response status code
 * @param {string} error - Error occured
 * @return {method} data - Return response to the client
 *
 */
export const onError = (res, status_code, error) => {
  return res.status(status_code).json({
    status: status_code,
    error,
  });
};

/**
 * This is a function.
 *
 * @param {object} res- The response object
 * @param {object} error - Error occured
 * @return {method} data - Return response to the client
 *
 */
export const onServerError = (res, error) => {
  if (error) {
    logger.error(error, "error", new Date());
  }
  return res.status(500).json({
    status: 500,
    error: "Internal Server Error",
  });
};
