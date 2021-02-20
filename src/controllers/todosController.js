import { onError, onServerError, onSuccess } from "../utils/response";
import db from "../database/models";
import { Op } from "sequelize";

class TodosController {
  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @return {object} - return a response to the client
   *
   */
  static async index(req, res) {
    try {
      const { page, size } = req.query;
      const limit = !size ? 10 : +size;
      const offset = !size || !page ? 0 : page * size;

      const todos = await db.Todo.findAndCountAll({
        where: { createdBy: req.user.id },
        order: [["id", "ASC"]],
        offset,
        limit,
      });
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(todos.count / limit);
      const results = {
        currentPage,
        totalPages,
        totalItems: todos.count,
        itemsPerPage: limit,
        rows: todos.rows,
      };
      return onSuccess(res, 200, "todos Successfully found", results);
    } catch (err) {
      return onServerError(res, err);
    }
  }

  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @return {object} - return a response to the client
   *
   */
  static async search(req, res) {
    try {
      const { page, size, searchHint } = req.query;
      const limit = !size ? 10 : +size;
      const offset = !size || !page ? 0 : page * size;

      const todos = await db.Todo.findAndCountAll({
        where: {
          [Op.and]: { createdBy: req.user.id },
          [Op.or]: [
            {
              title: {
                [Op.iLike]: `%${searchHint}%`,
              },
            },
            {
              description: {
                [Op.iLike]: `%${searchHint}%`,
              },
            },
            {
              priority: {
                [Op.iLike]: `%${searchHint}%`,
              },
            },
          ],
        },
        order: [["id", "ASC"]],
        offset,
        limit,
      });
      const currentPage = page ? +page : 0;
      const totalPages = Math.ceil(todos.count / limit);
      const results = {
        currentPage,
        totalPages,
        totalItems: todos.count,
        itemsPerPage: limit,
        rows: todos.rows,
      };
      return onSuccess(res, 200, "todos Successfully found", results);
    } catch (err) {
      return onServerError(res, err);
    }
  }

  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @return {object} - return a response to the client
   *
   */
  static async create(req, res) {
    try {
      const { id: createdBy } = req.user;
      const { title } = req.body;
      const todoExists = await db.Todo.findOne({
        where: {
          [Op.and]: [{ createdBy }, { title }],
        },
      });
      if (todoExists) return onError(res, 409, "Todo already exists");
      req.body.createdBy = createdBy;
      const todo = await db.Todo.create(req.body);
      return onSuccess(res, 201, "Created Successfully", todo);
    } catch (err) {
      return onServerError(res, err);
    }
  }

  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @return {object} - return a response to the client
   *
   */
  static async findOne(req, res) {
    try {
      const { todo_id } = req.params;
      const todo = await db.Todo.findOne({
        where: {
          [Op.and]: [{ createdBy: req.user.id }, { id: todo_id }],
        },
        include: [
          {
            model: db.User,
            as: "owner",
            attributes: ["id", "name"],
          },
        ],
      });
      if (!todo) return onError(res, 404, "No todo found");
      return onSuccess(res, 200, "Todo found successfully", todo);
    } catch (err) {
      return onServerError(res, err);
    }
  }

  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @return {object} - return a response to the client
   *
   */
  static async update(req, res) {
    try {
      const { todo_id } = req.params;
      const todoExists = await db.Todo.findOne({
        where: {
          [Op.and]: [{ createdBy: req.user.id }, { id: todo_id }],
        },
      });
      if (!todoExists) return onError(res, 404, "No todo found");
      const todo = await todoExists.update(req.body);
      return onSuccess(res, 200, "Todo updated successfully", todo);
    } catch (err) {
      return onServerError(res, err);
    }
  }

  /**
   * This is a function.
   *
   * @param {object} req - The request object
   * @param {object} res- The response object
   * @return {object} - return a response to the client
   *
   */
  static async delete(req, res) {
    try {
      const { todo_id } = req.params;
      const todo = await db.Todo.findOne({
        where: {
          [Op.and]: [{ createdBy: req.user.id }, { id: todo_id }],
        },
      });
      if (!todo) return onError(res, 404, "Todo not found");
      await todo.destroy(todo_id);
      return onSuccess(res, 200, "todo Successfully deleted");
    } catch (err) {
      return onServerError(res, err);
    }
  }
}
export default TodosController;
