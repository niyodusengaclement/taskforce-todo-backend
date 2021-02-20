import express from "express";
import helmet from "helmet";
import compression from "compression";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes";
import env from "dotenv";
import morgan from "morgan";
import { serve, setup } from "swagger-ui-express";
import swaggerDoc from "../swagger.json";

const app = express();
env.config();

app.use(helmet());
app.use(compression());
app.use(cors());
app.use(morgan("combined"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Welcome to Awesomety Lab Taskforce Challenge",
  });
});

app.use("/api", routes);
app.use("/api/doc", serve, setup(swaggerDoc));

app.use((req, res, next) => {
  const err = new Error("Endpoint not found");
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  const status = error.status || 500;
  res.status(status).json({
    status,
    error: error.message,
  });
});

export default app;
