import { port } from "config/environment";
import cors from "cors";
import express from "express";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";
import { initializeObjectStore } from "initializeObjectStore";
import morgan from "morgan";
import fs from "node:fs";
import path from "node:path";
import "tsconfig-paths/register";
import brandsRoutes from "@brands-routes/brand.routes";
import categoriesRoutes from "@categories-routes/categories.routes";
import productsRoutes from "@products-routes/products.routes";
import usersRoutes from "@users-routes/users.routes";
import sizeRoutes from "@sizes-routes/size.routes";
import variationsRoutes from "@variations-routes/variations.routes";
import eventCalendarRoutes from "@event-calendar-routes/event-calendar.routes";
import accountsRoutes from "@accounts-routes/accounts.routes";
import expenseRoutes from "@expense-routes/expense.routes";
import movementsRoutes from "@movement-routes/movement.routes";
import paymentMethodsRoutes from "@payment-methods-routes/payment-methods.routes";
import debtsRoutes from "@debt-routes/debt.routes";
import { sequelize } from "@lib/sequelize";
import { errorHandler } from "@middlewares";
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
  accountsRoutes,
  brandsRoutes,
  eventCalendarRoutes,
  expenseRoutes,
  movementsRoutes,
  debtsRoutes,
  paymentMethodsRoutes,
);
app.use(errorHandler);

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
