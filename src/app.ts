import express from "express";
import cors from "cors";
import { variationsRoutes, usersRoutes } from "./routes";
export const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("public/uploads"));
app.use(
  "/optimize",

  express.static("public/optimize")
);
app.use("/api", variationsRoutes, usersRoutes);
