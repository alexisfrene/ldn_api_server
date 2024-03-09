import express from "express";
import cors from "cors";
import { productRoutes } from "./routes";
export const app = express();

// const corsOptions = {
//   origin: (origin, callback) => {
//     if (origin && whiteList.indexOf(origin) !== -1) {
//       console.log("Hola");
//       callback(null, true);
//     } else {
//       console.log("ORIGIN -- >", origin);
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: ["GET", "POST", "PUT", "PATCH"],
//   credentials: true,
// } as cors.CorsOptions;
//app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/uploads",
  cors({ methods: ["GET"] }),
  express.static("public/uploads")
);
app.use(
  "/optimize",
  cors({ methods: ["GET"] }),
  express.static("public/optimize")
);
app.use("/api", cors(), productRoutes);
