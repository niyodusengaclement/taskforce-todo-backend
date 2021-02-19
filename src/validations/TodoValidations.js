import joi from "joi";
import { onError, onServerError } from "../utils/response";

class TodosValidations {
  Todo(req, res, next) {
    try {
      const validateSchema = joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        priority: joi.string().required().valid("LOW", "MEDIUM", "HIGH"),
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

export default new TodosValidations();
