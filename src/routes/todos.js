import express from "express";
import TodosController from "../controllers/todosController";
import auth from "../middlewares/auth";
import TodoValidations from "../validations/TodoValidations";

const routes = express.Router();

routes
  .route("/")
  .get(auth.checkToken, TodosController.index)
  .post(auth.checkToken, TodoValidations.Todo, TodosController.create);

routes
  .route("/:todo_id([0-9]{1,10})")
  .get(auth.checkToken, TodosController.findOne)
  .put(auth.checkToken, TodosController.update)
  .delete(auth.checkToken, TodosController.delete);

export default routes;
