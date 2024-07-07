import express, { Request, Response } from "express";
import db from "../lib/sequelize";
import {
  createUser,
  getAvatar,
  getPreferenceInProductView,
  getUserId,
  preferenceInProductView,
  userLogin,
} from "../controllers";
import { authenticateToken } from "../middleware";

const User = db.User;
const router = express.Router();

router.get("/user/preference", authenticateToken, getPreferenceInProductView);
router.get("/user", async (req: Request, res: Response) => {
  const query = req.query;
  if (query.get === "id") {
    return getUserId(req, res);
  }
  const allUser = await User.findAll({
    attributes: ["email", "username", "user_id"],
  });

  return res.status(200).send(allUser);
});
router.get("/user/avatar", authenticateToken, getAvatar);
router.post("/user", createUser);
router.post("/user/login", userLogin);
router.put("/user/preference", authenticateToken, preferenceInProductView);
export { router };
