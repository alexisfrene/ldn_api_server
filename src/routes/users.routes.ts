import express, { Request, Response } from "express";
import db from "../lib/sequelize";
import { createUser, getAvatar, getUserId, userLogin } from "../controllers";
import { authenticateToken } from "../middleware";

const User = db.User;
const router = express.Router();

//GET
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
//POST
router.post("/user", createUser);
router.post("/user/login", userLogin);
export { router };
