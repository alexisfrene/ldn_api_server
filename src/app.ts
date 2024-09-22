import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fs from "node:fs";
import path from "node:path";
import { rateLimit } from "express-rate-limit";
import {
  variationsRoutes,
  usersRoutes,
  productsRoutes,
  categoriesRoutes,
  sizeRoutes,
  financeRoutes,
} from "./routes";
import { errorHandler } from "./middleware";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 150,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(limiter);
app.use(helmet());
app.use(morgan("combined", { stream: accessLogStream }));
app.use(
  morgan((tokens, req, res) => {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");
  })
);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  "/api",
  variationsRoutes,
  usersRoutes,
  productsRoutes,
  categoriesRoutes,
  sizeRoutes,
  financeRoutes
);
app.use(errorHandler);

export { app };
