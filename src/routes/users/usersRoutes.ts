import express from "express";
import {
  getAvatar,
  getPreferenceInProductView,
  preferenceInProductView,
  changeAvatar,
} from "../../controllers";
import { upload } from "../../lib";

const router = express.Router();

router.get("/preference", getPreferenceInProductView);
router.get("/avatar", getAvatar);
router.patch("/avatar", upload.single("file"), changeAvatar);
router.put("/preference", preferenceInProductView);

export default router;
