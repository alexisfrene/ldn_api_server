import express from "express";
import fs from "node:fs";
import path from "node:path";
import { port } from "config/environment";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { initializeObjectStore } from "initializeObjectStore";
import morgan from "morgan";
import "tsconfig-paths/register";
import {
  brandsRoutes,
  categoriesRoutes,
  eventCalendarRoutes,
  financeRoutes,
  productsRoutes,
  sizeRoutes,
  usersRoutes,
  variationsRoutes,
} from "@routes";
import { errorHandler } from "@middlewares";
import { sequelize } from "@lib";
import { initializeDB } from "./initializeDB";
import { startServer } from "./startServer";

const app = express();
app.set("trust proxy", "172.17.0.1");
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  limit: 1500,
  standardHeaders: true,
  legacyHeaders: false,
});
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" },
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
  }),
);

app.use(
  cors({
    origin: ["https://lodenaty.com", "http://localhost:5173"],
    credentials: true,
  }),
);
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
  financeRoutes,
  brandsRoutes,
  eventCalendarRoutes,
);
app.use(errorHandler);

process.loadEnvFile();

const PORT: string | number = port;

const main = async (): Promise<void> => {
  try {
    await initializeObjectStore();
    await initializeDB(sequelize);
    await startServer(app, PORT);
  } catch (error) {
    console.error("Error en la el comienzo de la aplicación:", error);
    process.exit(1);
  }
};

main();

export { app };
