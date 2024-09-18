import express, { Request, Response } from "express";
import {
  createUser,
  getAvatar,
  getPreferenceInProductView,
  getUserId,
  preferenceInProductView,
  userLogin,
} from "../../controllers";
import { changeAvatar } from "../../controllers/users/PATCH";
import { upload } from "../../lib/multer";

const router = express.Router();

router.get("/preference", getPreferenceInProductView);
router.get("/", async (req: Request, res: Response) => {
  const query = req.query;
  if (query.get === "id") {
    return getUserId(req, res);
  }
  return res.status(400).json({ error: true, message: "NO se encontró nada" });
});
router.get("/avatar", getAvatar);
router.patch(
  "/avatar",
  upload.single("file"),

  changeAvatar
);
router.post("/", createUser);
router.post("/login", userLogin);
router.put("/preference", preferenceInProductView);

export default router;
