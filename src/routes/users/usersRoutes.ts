import express from "express";
import {
  getAvatar,
  getPreferenceInProductView,
  preferenceInProductView,
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
router.put("/preference", preferenceInProductView);

export default router;
