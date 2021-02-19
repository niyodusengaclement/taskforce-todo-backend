import express from "express";
import auth from "./auth";
import todos from "./todos";

const routes = express.Router();

routes.use("/auth", auth);
routes.use("/todos", todos);

export default routes;
