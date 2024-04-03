import express, { Response } from "express";
import { User } from "../lib/sequelize/models";
import { createUser } from "../controllers";

const router = express.Router();

//GET
router.get("/user", async (__, res: Response) => {
  const allUser = await User.findAll();
  return res.status(200).send(allUser);
});
router.post("/user", createUser);

export { router };
