import joi from "joi";
import { onError, onServerError } from "../utils/response";

class UserValidations {
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
