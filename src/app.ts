import "tsconfig-paths/register";
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
} from "@routes";
import { errorHandler } from "@middlewares";
import { sequelize } from "@lib";
import { initializeDB } from "./initializeDB";
import { startServer } from "./startServer";

const app = express();

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 1500,
  standardHeaders: "draft-7",
  legacyHeaders: false,
});
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(limiter);
app.use(helmet());
app.use(morgan("dev", { stream: accessLogStream }));
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

app.use("/api/test", (_req, res) => res.status(200).json({ server: "on" }));

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

process.loadEnvFile();

const PORT: string | number = process.env.PORT || 3210;

const main = async (): Promise<void> => {
  try {
    await initializeDB(sequelize);
    await startServer(app, PORT);
  } catch (error) {
    console.error("Error en la el comienzo de la aplicación:", error);
    process.exit(1);
  }
};

main();

export { app };
