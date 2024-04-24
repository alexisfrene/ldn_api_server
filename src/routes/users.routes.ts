import express, { Response } from "express";
import { User } from "../lib/sequelize/models";
import { createUser, userLogin } from "../controllers";

const router = express.Router();

//GET
router.get("/user", async (__, res: Response) => {
  const allUser = await User.findAll({
    attributes: ["email", "username", "user_id"],
  });
  return res.status(200).send(allUser);
});
//POST
router.post("/user", createUser);
router.post("/user/login", userLogin);
export { router };
