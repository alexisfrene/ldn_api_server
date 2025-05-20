import express from "express";
import { changeAvatar } from "@users-controllers/edit-avatar-image.controller";
import { upload } from "@lib/multer";

const router = express.Router();

router.patch("/avatar", upload.single("file"), changeAvatar);

export default router;
