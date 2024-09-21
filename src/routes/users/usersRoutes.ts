import express from "express";
import {
  createUser,
  getAvatar,
  getPreferenceInProductView,
  preferenceInProductView,
  userLogin,
} from "../../controllers";
import { changeAvatar } from "../../controllers/users/PATCH";
import { upload } from "../../lib";

const router = express.Router();

router.get("/preference", getPreferenceInProductView);
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
