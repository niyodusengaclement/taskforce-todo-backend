import joi from "joi";
import { onError, onServerError } from "../utils/response";

class UserValidations {
  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @param {object} next - Pass to the next middleware
   *
   */
  register(req, res, next) {
    try {
      const validateSchema = joi.object({
        username: joi.string().required().min(4),
        password: joi.string().required().min(6),
        name: joi.string().required(),
      });
      const { error } = validateSchema.validate(req.body);
      if (error)
        return onError(res, 400, error.details[0].message.split('"').join(""));
      return next();
    } catch (err) {
      return onServerError(res, err);
    }
  }

  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @param {object} next - Pass to the next middleware
   *
   */
  login(req, res, next) {
    try {
      const validateSchema = joi.object({
        username: joi.string().required().min(4),
        password: joi.string().required().min(6),
      });
      const { error } = validateSchema.validate(req.body);
      if (error)
        return onError(res, 400, error.details[0].message.split('"').join(""));
      return next();
    } catch (err) {
      return onServerError(res, err);
    }
  }
}
export default new UserValidations();
